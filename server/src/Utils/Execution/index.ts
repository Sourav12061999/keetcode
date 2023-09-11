import { exec } from "child_process";
import path from "path";
import { LangModel } from "../../Schemas";
import { TestcaseType } from "../../Schemas/Testcases.schema";
import { writeFile } from "fs/promises";
async function Execution(testcase: TestcaseType, langID: string, Sol: string) {
  return new Promise(async (resolve, reject) => {
    const lang = await LangModel.findById(langID).lean().exec();
    const FilePath = path.join(__dirname, `../../../runner/${lang?.FileName}`);
    await writeFile(
      FilePath,
      `
     ${Sol}
     const param = ${testcase.Input}
     run(param);
    `
    );
    let output: string | null = null;
    const child = exec(
      `${lang?.Command} ${FilePath}`,
      (error, stdout, stderr) => {
        if (error) return;
        output = stdout;
      }
    );

    // Check memory usage periodically
    const memoryInterval = setInterval(() => {
      const memoryUsage = process.memoryUsage().heapUsed;
      if (memoryUsage > testcase.MemoryLimit) {
        child.kill(); // Terminate the child process
        clearInterval(memoryInterval);
        reject("Memory Limit Exceeded");
      }
    }, 500);
    // Set a timeout to limit execution time
    const timeout = setTimeout(() => {
      if (!child.connected) return; // Check if the process is already closed
      child.kill(); // Terminate the child process
      clearInterval(memoryInterval);
      reject("Time Limit Exceeded");
    }, testcase.Timelimit);

    // Handle errors
    child.on("error", (err) => {
      clearTimeout(timeout);
      clearInterval(memoryInterval);
      reject(err?.message || "Unknown Error");
    });
    // Handle process exit
    child.on("exit", (code, signal) => {
      if (signal === "SIGTERM") {
        // Don't Do anything will be handled by their respective method
        console.log("Process was terminated by child.kill()");
      } else if (code === 0) {
        if (!output) return reject("Unknown Error! output is null");
        else if (output.trim() === testcase.Output.trim()) {
          resolve("Resolved");
        } else {
          reject(`Expected: ${testcase.Output}
                Received: ${output}`);
        }
      } else {
        console.log(`Process exited with code ${code}`);
      }
      clearTimeout(timeout);
      clearInterval(memoryInterval);
    });
  });
}

export { Execution };

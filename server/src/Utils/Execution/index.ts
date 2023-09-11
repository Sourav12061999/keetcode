import { exec, spawn } from "child_process";
import path from "path";
import { LangModel } from "src/Schemas";
import { TestcaseType } from "../../Schemas/Testcases.schema";
import { writeFile } from "fs/promises";
async function Execution(testcase: TestcaseType, langID: string, Sol: string) {
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
  const child = exec("your_command_here", (error, stdout, stderr) => {});

  // Check memory usage periodically
  const memoryInterval = setInterval(() => {
    const memoryUsage = process.memoryUsage().heapUsed;
    if (memoryUsage > testcase.MemoryLimit) {
      child.kill(); // Terminate the child process
      clearInterval(memoryInterval);
    }
  }, 500);
  // Set a timeout to limit execution time
  const timeout = setTimeout(() => {
    if (!child.connected) return; // Check if the process is already closed
    child.kill(); // Terminate the child process
    clearInterval(memoryInterval);
  }, testcase.Timelimit);

  // Handle errors
  child.on("error", (err) => {
    clearTimeout(timeout);
    clearInterval(memoryInterval);
    console.error(err);
  });

  // Handle process exit
  child.on("exit", (code, signal) => {
    clearTimeout(timeout);
    clearInterval(memoryInterval);
    console.log(`Child process exited with code ${code}`);
  });
}

export { Execution };

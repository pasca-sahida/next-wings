import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(
  process.cwd(),
  "/src/app/api/employees/employees.json"
);

export async function GET(request: Request) {
    const jsonData: any = await fsPromises.readFile(dataFilePath);
    const objectData: any = JSON.parse(jsonData);
    try {
      const url = new URL(request.url);
      const employee_id = url.searchParams.get("emp_id");
      const search: any = objectData.find((x: any) => x.emp_id == employee_id);
  
      if (search) {
        const index: number = objectData.indexOf(search);
  
        return NextResponse.json({
          success: true,
          data: objectData[index],
          message: `Success get employee (employee id: ${employee_id})!`,
          error_code: 200,
        });
      } else {
        return NextResponse.json({
          success: false,
          data: [],
          message: `Employee not found (employee id: ${employee_id})!`,
          error_code: 404,
        });
      }
    } catch (error) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Internal server error!",
        error_code: 500,
      });
    }
  }
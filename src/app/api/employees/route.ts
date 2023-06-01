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
  return NextResponse.json({
    success: true,
    data: objectData,
    message: "Success get employee!",
    error_code: 200,
  });
}

export async function POST(request: Request) {
  const jsonData: any = await fsPromises.readFile(dataFilePath);
  const objectData: any = JSON.parse(jsonData);
  try {
    const body: any = await request.json();
    const { data } = await body;
    const search: any = objectData.find((x: any) => x.emp_id === data.emp_id);

    if (search) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Employee already exist!",
        error_code: 302,
      });
    } else {
      objectData.push(data);
      const updatedData: any = JSON.stringify(objectData);
      await fsPromises.writeFile(dataFilePath, updatedData);

      return NextResponse.json({
        success: true,
        data: [],
        message: "Success add new employee!",
        error_code: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: "Internal server error!",
      error_code: 500,
      error_message: error
    });
  }
}

export async function PUT(request: Request) {
  const jsonData: any = await fsPromises.readFile(dataFilePath);
  const objectData: any = JSON.parse(jsonData);
  try {
    const body: any = await request.json();
    const { data } = await body;
    const search: any = objectData.find((x: any) => x.emp_id === data.emp_id);

    if (search) {
      const index: number = objectData.indexOf(search);
      objectData[index] = data;
      const updatedData: any = JSON.stringify(objectData);
      await fsPromises.writeFile(dataFilePath, updatedData);

      return NextResponse.json({
        success: true,
        data: [],
        message: `Success update employee!(employee id: ${data.emp_id})`,
        error_code: 200,
      });
    } else {
      return NextResponse.json({
        success: false,
        data: [],
        message: `Employee not found (employee id: ${data.emp_id})!`,
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

export async function DELETE(request: Request) {
  const jsonData: any = await fsPromises.readFile(dataFilePath);
  const objectData: any = JSON.parse(jsonData);
  try {
    const url = new URL(request.url);
    const employee_id = url.searchParams.get("emp_id");
    const search: any = objectData.find((x: any) => x.emp_id == employee_id);

    if (search) {
      const index: number = objectData.indexOf(search);
      objectData.splice(index, 1);
      const updatedData: any = JSON.stringify(objectData);
      await fsPromises.writeFile(dataFilePath, updatedData);

      return NextResponse.json({
        success: true,
        data: [],
        message: `Success remove employee (employee id: ${employee_id})!`,
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

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, matter, description } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not defined in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Web3Forms API to send email and save submission
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        phone,
        matter,
        description,
        subject: `New Legal Inquiry from ${name} - ${matter || "General"}`,
        from_name: "Priyanka Portfolio Web Forms",
      }),
    });
    console.log(response);

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ success: true, message: "Message sent successfully" });
    } else {
      console.error("Web3Forms error:", result);
      return NextResponse.json(
        { error: "Failed to send message via Web3Forms" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

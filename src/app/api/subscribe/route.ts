import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID;

    if (!apiKey || !formId) {
      console.error("Missing KIT_API_KEY or KIT_FORM_ID environment variables");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          first_name: firstName || "",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Kit API error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

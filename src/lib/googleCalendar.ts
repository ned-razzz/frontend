// import { calendar } from "@/lib/googleCalendarAccess";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // POST request
//     if (req.method === "POST") {
//       // New Event Creation
//       const { summary, description, start, end } = req.body;
//       const event = await calendar.events.insert({
//         calendarId: process.env.CALENDAR_ID,
//         requestBody: {
//           summary, // 이벤트 제목
//           description, // 이벤트 설명
//           start: { dateTime: start }, // 시작 시간
//           end: { dateTime: end }, // 종료 시간
//         },
//       });

//       return res.status(200).json(event.data);
//     }

//     // GET request
//     else if (req.method === "GET") {
//       // Get Calendar Event
//       const events = await calendar.events.list({
//         calendarId: process.env.CALENDAR_ID,
//         timeMin: new Date().toISOString(), // 현재 시간 이후의 이벤트
//         maxResults: 10,
//         singleEvents: true,
//         orderBy: "startTime",
//       });

//       return res.status(200).json(events.data);
//     } else {
//       res.setHeader("Allow", ["GET", "POST"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }

//     //Exception Handler
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return res.status(500).json({ error: error.message });
//     }
//     return res.status(500).json({ error: "An unknown error occurred" });
//   }
// }

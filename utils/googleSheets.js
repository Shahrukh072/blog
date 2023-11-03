const { google } = require ("googleapis");

exports.appendEmailToGoogleSheet = async (email) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "../Blogs/config/sheet-credential.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const request = {
      auth,
      spreadsheetId,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[email]],
      },
    };

    // Make the request
    const response = await googleSheets.spreadsheets.values.append(request);

    return response.data.updates;
  } catch (err) {
    throw new Error(`Error while appending email: ${err.message}`);
  }
};

// export const appendUserFeedbackToGoogleSheet = async (
//   currentDate,
//   uid,
//   userFeedback,
//   phone
// ) => {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       keyFile: "../BackendGurucool/config/sheet-credential.json",
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });
//     const spreadsheetId = process.env.SPREADSHEET_ID_USERFEEDBACK;

//     const client = await auth.getClient();
//     const googleSheets = google.sheets({ version: "v4", auth: client });

//     const response = await googleSheets.spreadsheets.values.append({
//       auth,
//       spreadsheetId,
//       //range: "Sheet1",
//       range: "User!A1",
//       valueInputOption: "USER_ENTERED",
//       resource: {
//         values: [[currentDate, uid, userFeedback, phone]],
//       },
//     });
//     return response.data.updates;
//   } catch (err) {
//     throw new Error(`Error while appending feedback: ${err.message}`);
//   }
// };

// export const appendAstroFeedbackToGoogleSheet = async (
//   currentDate,
//   gid,
//   guruFeedback,
//   phone
// ) => {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       keyFile: "../BackendGurucool/config/sheet-credential.json",
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });
//     const spreadsheetId = process.env.SPREADSHEET_ID_USERFEEDBACK;

//     const client = await auth.getClient();
//     const googleSheets = google.sheets({ version: "v4", auth: client });

//     const response = await googleSheets.spreadsheets.values.append({
//       auth,
//       spreadsheetId,
//       //range: "Sheet1",
//       range: "Astro!A1",
//       valueInputOption: "USER_ENTERED",
//       resource: {
//         values: [[currentDate, gid, guruFeedback, phone]],
//       },
//     });
//     return response.data.updates;
//   } catch (err) {
//     throw new Error(`Error while appending feedback: ${err.message}`);
//   }
// };

// export const appendUserFeedbackToGoogleSheetMobile = async (
//   currentDate,
//   uid,
//   userFeedback,
//   phone,
//   Devicemodel,
//   AndroidVersion
// ) => {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       keyFile: "../BackendGurucool/config/sheet-credential.json",
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });
//     const spreadsheetId = process.env.SPREADSHEET_ID_USERFEEDBACK;

//     const client = await auth.getClient();
//     const googleSheets = google.sheets({ version: "v4", auth: client });

//     const response = await googleSheets.spreadsheets.values.append({
//       auth,
//       spreadsheetId,
//       //range: "Sheet1",
//       range: "Mobile!A1",
//       valueInputOption: "USER_ENTERED",
//       resource: {
//         values: [
//           [currentDate, uid, userFeedback, phone, Devicemodel, AndroidVersion],
//         ],
//       },
//     });
//     return response.data.updates;
//   } catch (err) {
//     throw new Error(`Error while appending feedback: ${err.message}`);
//   }
// };

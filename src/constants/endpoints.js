export const LOGIN = "/auth/authentication";

export const SIGN_UP = "/auth/signup";

export const DEPARTMENTS = `/departments`;
export const EMPLOYEES = `/employees`;

export const BULK_UPLOAD_EMPLOYEES = `/employees/bulk_upload_users`;

export const ENTRY_ROOM_911 = `/auth/entry_room_911`;

export const EXPORT_SAMPLE_FILE = "/export/sample_file";

export const INCOME_RECORD = "/export/income_record";

export const URI_DOWNLOAD_SAMPLE_FILE = `${process.env.REACT_APP_API_URL}${EXPORT_SAMPLE_FILE}`;

export const URI_DOWNLOAD_INCOME_RECORD = `${process.env.REACT_APP_API_URL}${INCOME_RECORD}`;

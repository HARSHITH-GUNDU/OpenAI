import axios from "axios";

export const transcribeAudio = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);

    const ROUTE = "http://localhost:5000/transcribe-audio"

    const response = await axios.post(ROUTE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}
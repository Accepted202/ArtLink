package com.example.projecttest1.helper;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
public class Helper {
    public static String getJsonStringFromMap(Map<String, Object> map) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonStr = objectMapper.writeValueAsString(map);
        return jsonStr;
    }

    public static int SendMsg(String pathurl, Map<String, Object> msg) throws Exception {
        URL url = new URL(pathurl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        String postData = getJsonStringFromMap(msg);
        byte[] postDataBytes = postData.getBytes(StandardCharsets.UTF_8);


        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Content-Length", String.valueOf(postData.length()));
        conn.setDoOutput(true);

        OutputStream outputStream = conn.getOutputStream();
        outputStream.write(postDataBytes);
        outputStream.flush();
        outputStream.close();

        conn.connect();
        int responseCode = conn.getResponseCode();

        conn.disconnect();
        return responseCode;
    }
}

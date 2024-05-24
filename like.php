<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $urls = explode(',', $_POST['urls']);
    $interval = intval($_POST['interval']);

    $api_url = "https://client.warpcast.com/v2/cast-likes";
    $user_info_url = "https://client.warpcast.com/v2/me";
    $headers = [
        "accept: */*",
        "accept-language: en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7",
        "authorization: Bearer $token",
        "content-type: application/json; charset=utf-8",
        "fc-amplitude-device-id: 6jhzHIGgkRL4rLE4GwC0oY",
        "fc-amplitude-session-id: 1716541637738",
        "sec-ch-ua: \"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
        "sec-ch-ua-mobile: ?0",
        "sec-ch-ua-platform: \"Linux\"",
        "sec-fetch-dest: empty",
        "sec-fetch-mode: cors",
        "sec-fetch-site: same-site"
    ];

    // Fetch user info
    $ch = curl_init($user_info_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $user_response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
        exit;
    }

    $user_info = json_decode($user_response, true);
    if (isset($user_info['error'])) {
        echo 'Error: ' . $user_info['error']['message'];
        exit;
    }

    echo "<h2>User Info</h2>";
    echo "FID: " . $user_info['result']['fid'] . "<br>";
    echo "Followers: " . $user_info['result']['followers'] . "<br><br>";

    foreach ($urls as $url) {
        // Assuming castHash is part of the URL path
        $url_parts = explode('/', trim($url));
        $castHash = end($url_parts); // This assumes castHash is the last part of the URL

        if ($castHash) {
            $data = json_encode(["castHash" => $castHash]);

            $ch = curl_init($api_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

            $response = curl_exec($ch);
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            } else {
                $response_data = json_decode($response, true);
                if (isset($response_data['error'])) {
                    echo "Gagal menyukai URL $url: " . $response_data['error']['message'] . "<br>";
                } else {
                    echo "Berhasil menyukai URL $url<br>";
                }
            }
            curl_close($ch);

            sleep($interval);
        } else {
            echo "URL target tidak valid: $url <br>";
        }
    }
}
?>

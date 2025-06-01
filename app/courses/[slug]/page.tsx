<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cybersecurity Full Course</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
    }
    .module {
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: #fff;
    }
    .header {
      background: #f0f0f0;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 16px;
    }
    .header span {
      margin-right: 8px;
    }
    .content {
      display: none;
      padding: 10px;
    }
    .btn {
      display: inline-block;
      margin-top: 8px;
      padding: 8px 12px;
      background: #007bff;
      color: #fff;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 14px;
      margin-right: 8px;
      margin-bottom: 8px;
    }
    iframe {
      width: 100%;
      height: 360px;
      border: none;
      border-radius: 8px;
      margin-top: 8px;
      display: none;
    }
  </style>
</head>
<body>

<script>
  function toggleContent(header) {
    const content = header.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      document.querySelectorAll('.content').forEach(c => (c.style.display = 'none'));
      document.querySelectorAll('iframe').forEach(i => (i.style.display = 'none'));
      content.style.display = 'block';
    }
  }

  function loadAndShowVideo(btn, url) {
    const iframe = btn.nextElementSibling;
    iframe.src = url;
    iframe.style.display = 'block';
    btn.style.display = 'none';
  }
</script>

<!-- শুরু: ভিডিও মডিউল -->

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Termux Setup</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16YbN7XErgNg8TZj_v3mSkSkJpt-45epo/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Termux Full Tutorial</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16EOap2RtbMgHpN3Ovr7zhXWYAhvwbAWv/preview')">▶️ Class 1</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16KEXIFfUKYmiwa6rd9qsLmoecIjkhM4e/preview')">▶️ Class 2</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Email Bombing</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/13NifAYqDFJWAj_FJFphL6aFaE12ZP--Y/preview')">▶️ Kali Linux</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/13cURG5yx8xwI66kxXyJcrVA63Yy72zSn/preview')">▶️ Android</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Facebook ID Disable</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/14Rctra-L8IxUqSARpvU_OyCsvY_UNhc1/preview')">▶️ How to Disable</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/14ULYr9s8mrx2XEVCKlqNwD6ExwX926eh/preview')">▶️ Edited Version</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Social Media Hacking</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16D2un_1UuftaPPM9J0Q9gh7jLk2qGEnM/preview')">▶️ What is Phishing?</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/1645lYmdYlbl5HJ2a3XnZSGqOStoItuC3/preview')">▶️ Create Phishing Page</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/1685rY-SS97PBLjurwBOxSS0wGXuuHgjC/preview')">▶️ Advanced Phishing Attack</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> WiFi Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16hEiMfDiwYcI6iJKkNRF5mS0Du2GPh0J/preview')">▶️ Hack Router Admin Panel</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16kUk29yPtxniC8Qj8MNDrqs2DDhWIYZm/preview')">▶️ Config.bin File</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16lb-Sbg7KBYrqnFdaOO3lLzr4S7sMg26/preview')">▶️ Advanced WiFi Phishing</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16lf-Sbg7KBYrqnFdaOO3lLzr4S7sMg26/preview')">▶️ Hack TP-Link & Others</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Android Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/130cLLIJiAO-njGVCyB-5gvxbKq5lhkj0/preview')">▶️ Install Metasploit & Hack Android</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/12rY6iK_6KgVcH1rgBPMJmH65ldbxd0fq/preview')">▶️ Undetectable Keylogger</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/12oorDua7hX5xO_p9rB-InOneSH8vdDTn/preview')">▶️ Hack Android via IP</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Keylogger Full Course</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/15HDV5V5rPaSB8xTyhGeymYwX6qHmh1AW/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Facebook Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/13sSEDRcAy84Y6EngKC_jxwimTVOVyMwH/preview')">▶️ Recover Facebook Account</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/13vcsolABBatsTW2aFCdtWJ2iTE3bNfyY/preview')">▶️ Use Hacking App</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Imo Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/14sjrGWxSzTCZKDXgFp5NqeFjpAeQdVss/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Gmail Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/14bXHWIV6JlA6CSdcD_mGwKrZI9ocUFXF/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Instagram Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/15H1LsfZe9-QpP4wkDRBoXad6N1vMJGYP/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Website Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/16epapFtT1Xe2FlTdVC4OC48bLo6epl_K/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> CCTV Hack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/13EIna_mnkg-3dQ305jsooD7OMiOPs7uQ/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Social Engineering</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/15fC8pfglqsdj5v69TgX0PCaRU9RxmmW0/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Email Spoofing</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/13lX9gfchfp5iEYsDopgl_cpkBGnOqVez/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Location Tracking</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/15QwkRlOHN0Ll6dBXfU8GWuqZmHCJg3th/preview')">▶️ Location tracker</button>
    <iframe allowfullscreen></iframe>
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/15Uy2IqF1a2fvaHc7ZfxkicDuU1wcfARZ/preview')">▶️ Track Anyone's Location</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Session Hijacking Attack</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/14kYe9c-VAtjksz_JVgkD8-TZQK80o3Xp/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Hacking Tips And Tricks</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/14hbrdG9y5E0IbpC4AUr2uJKX9orJxYGH/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<div class="module">
  <div class="header" onclick="toggleContent(this)"><span>▶️</span> Root/Unroot Device</div>
  <div class="content">
    <button class="btn" onclick="loadAndShowVideo(this, 'https://drive.google.com/file/d/15YG8k9sgoKgVeuXfOvmVtPvnVrCV8ait/preview')">▶️ Watch Video</button>
    <iframe allowfullscreen></iframe>
  </div>
</div>

<!-- সব শেষ -->

</body>
</html>

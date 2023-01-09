$files = Get-ChildItem -Filter "*.png"
$index = 0

foreach ($file in $files) {
    $newName = "$index.png"
    Rename-Item -Path $file.FullName -NewName $newName
    $index++
}

Start-Process -FilePath "ffmpeg.exe" -ArgumentList "-r 1 -start_number 0 -i %d.png answer_sets.gif -y"
Add-Type -AssemblyName System.Drawing

$inputPath = Join-Path $PSScriptRoot "src/assets/calcifer.png"
$outputPath = Join-Path $PSScriptRoot "src/assets/calcifer_square.png"

if (-not (Test-Path $inputPath)) {
    Write-Error "Could not find calcifer.png at $inputPath"
    exit 1
}

Write-Host "Loading image..."
$img = [System.Drawing.Image]::FromFile($inputPath)

$w = $img.Width
$h = $img.Height
$max = [Math]::Max($w, $h)

Write-Host "Original dimensions: ${w}x${h}. Creating transparent square of ${max}x${max}..."

# Create a new transparent square bitmap
$bmp = New-Object System.Drawing.Bitmap($max, $max)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::Transparent)

# Center the original image
$x = [int](($max - $w) / 2)
$y = [int](($max - $h) / 2)

# Draw original image
$g.DrawImage($img, $x, $y, $w, $h)

# Save as PNG to preserve transparency
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Clean up memory
$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Successfully created square transparent icon at $outputPath"

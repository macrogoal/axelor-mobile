# Find all package.json files in the packages/apps directory
$packageFiles = Get-ChildItem -Path "d:\axelor\axelor-mobile\packages\apps" -Recurse -Filter "package.json" -Depth 1

# Loop through each package.json file
foreach ($file in $packageFiles) {
    Write-Host "Updating $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace 'rm -rf lib/' with 'rimraf lib/' in the clean script
    $updatedContent = $content -replace '"clean": "rm -rf lib/",', '"clean": "rimraf lib/",'
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $updatedContent -NoNewline
}

Write-Host "All clean scripts have been updated to use rimraf."
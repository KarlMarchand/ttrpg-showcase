# Install the extension
Firefox:
1. Navigate to about:debugging -> "This Firefox"
2. Click "Load Temporary Add-ons..."
3. Select the manifest.json in the folder "./extensions/firefox/kanka folder"

## Troubleshooting

If the frontend doesn't react to Kanka interactions, it might not be running on the port that the extension supports. Make sure that your frontend is running on http://localhost:5173.
#!/bin/sh

# Replace relative image paths with absolute CDN URLs in content directory

find content -type f \( -name "*.mdx" -o -name "*.md" \) | while read -r file; do
    # Get the directory path relative to project root
    dir=$(dirname "$file")
    
    # Replace "](./images" with local content path for in-app serving
    sed -i "s#](\./images#](/content/${dir}/images#g" "$file"
    
    echo "Processed: $file"
done

echo "Image path replacement completed"

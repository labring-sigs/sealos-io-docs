#!/bin/sh

# Replace relative image paths with absolute CDN URLs in content directory

find content -type f \( -name "*.mdx" -o -name "*.md" \) | while read -r file; do
    # Get the directory path relative to project root
    dir=$(dirname "$file")
    rel_dir="$dir"
    if [ "$rel_dir" = "content" ]; then
        rel_dir=""
    elif [ "${rel_dir#content/}" != "$rel_dir" ]; then
        rel_dir="${rel_dir#content/}"
    fi
    if [ -n "$rel_dir" ]; then
        target_path="https://__APP_URL__/content/${rel_dir}/images"
    else
        target_path="https://__APP_URL__/content/images"
    fi
    
    # Replace "](./images" with runtime placeholder URL for in-app serving
    sed -i "s#](\./images#](${target_path}#g" "$file"
    
    echo "Processed: $file"
done

echo "Image path replacement completed"

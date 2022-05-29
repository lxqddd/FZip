#!/bin/bash

echo '开始打包'

npm run build

echo '打包完成，开始发布'

npm publish --access public

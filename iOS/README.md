# iOS如何配置plist安装文件

xxx.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>items</key>
	<array>
		<dict>
			<key>assets</key>
			<array>
				<dict>
					<key>kind</key>
					<string>software-package</string>
					<key>url</key>
					<string>https://xxx.oss-xx-xx.xx.com/path/xxx.ipa</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>url</key>
					<string>https://xxx.oss-xx-xx.xx.com/path/xxx.png</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>full-size-image</string>
					<key>url</key>
					<string>https://xxx.oss-xx-xx.xx.com/path/xxx.png</string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
				<string>xxx.xxx.xxx</string>
				<key>bundle-version</key>
				<string>x.x.x</string>
				<key>kind</key>
				<string>software</string>
				<key>title</key>
				<string>appName</string>
			</dict>
		</dict>
	</array>
</dict>
</plist>

```

open url

使用iPhone自带相机扫下面字符串生成二维码 或者 使用 safari 打开下面的链接
```
itms-services://?action=download-manifest&url=https://xxx.oss-xx-xx.xx.com/path/xxx.plist
```



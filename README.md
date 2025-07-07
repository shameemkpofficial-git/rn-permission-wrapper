
```markdown
# 🚀 react-native-permission-handler-wrapper

A lightweight and reusable **React Native** wrapper component to handle **runtime permissions** like camera, location and photo library — with a fallback modal when access is denied or blocked.

## 📦 Installation

```bash
npm install react-native-permission-handler-wrapper react-native-permissions
```

> Don't forget to follow platform-specific setup for `react-native-permissions`:
> [React Native Permissions Setup Guide](https://github.com/zoontek/react-native-permissions#setup)

## ⚙️ Supported Permissions

| Type           | iOS                      | Android                            |
| -------------- | ------------------------ | ---------------------------------- |
| `camera`       | `PERMISSIONS.IOS.CAMERA` | `PERMISSIONS.ANDROID.CAMERA`       |
| `location`     | `LOCATION_WHEN_IN_USE`   | `ACCESS_FINE_LOCATION`             |
| `photo`        | `PHOTO_LIBRARY`          | `READ_MEDIA_IMAGES` (Android 13+)  |


## 🧠 Usage

```tsx
import { PermissionHandler } from 'react-native-permission-handler-wrapper';
import { Text } from 'react-native';

const CameraScreen = () => {
  return (
    <PermissionHandler type="camera">
      <Text>Camera is active 🎥</Text>
    </PermissionHandler>
  );
};
```

## ✨ Features

* � Auto-check and request permission on mount
* 📵 Shows modal with message if blocked
* ⚙️ Opens device settings to enable permissions
* ✅ Simple wrapper component — drop-in ready
* 🛡 TypeScript support out of the box

## 🧩 Props

| Prop       | Type                                                  | Required | Description                                    |
| ---------- | ----------------------------------------------------- | -------- | ---------------------------------------------- |
| `type`     | `'camera' \| 'location' \| 'photo'` | ✅        | The type of permission to request/check        |
| `children` | `React.ReactNode`                                     | ✅        | The content to render if permission is granted |

## 🔧 Example Use Cases

* Camera preview access
* Location-based check-in
* Photo upload from gallery

## 🐞 Issues

If you run into issues or want to request features, [open an issue](https://github.com/shameemkpofficial-git/rn-permission-wrapper/issues).

## 👨‍💻 Author

**Shameem KP**  
[GitHub](https://github.com/shameemkpofficial-git) • [LinkedIn](https://www.linkedin.com/in/shameemkpofficial/)

## 📜 License

MIT License

## 📊 Badges

[![npm version](https://img.shields.io/npm/v/react-native-permission-handler-wrapper.svg)](https://www.npmjs.com/package/react-native-permission-handler-wrapper)

```
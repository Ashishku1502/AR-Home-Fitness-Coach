# AR Home Fitness Coach

An AI-powered mobile fitness application that uses computer vision and augmented reality to provide real-time form correction and workout tracking.

## 🎯 Overview

AR Home Fitness Coach leverages your phone's camera to detect body pose, track exercise repetitions, analyze form correctness, and provide personalized feedback through AR overlays and audio guidance.

### Key Features

- **Real-Time Pose Detection**: Tracks 33+ body keypoints using MediaPipe
- **Automatic Rep Counting**: Detects and counts repetitions for various exercises
- **Form Correction**: Highlights incorrect posture with color-coded AR overlays
- **AR Visual Feedback**: Skeleton overlay with motion path guidance
- **Exercise Library**: Predefined workouts + custom exercise creation
- **Analytics Dashboard**: Track progress, posture scores, and improvements
- **Offline-First**: All pose detection works without internet
- **Voice Guidance**: Real-time audio coaching

## 🏗️ Architecture

```
[Phone Camera] 
    │
    ▼
[React Native App]
    │
    ├── Camera Feed → MediaPipe Pose → TensorFlow Lite
    ├── Pose Analysis → Rep Counter → Form Analyzer
    ├── AR Renderer → ARKit/ARCore → Visual Feedback
    ├── Analytics → Track History & Scores
    └── Optional Backend → Firebase → Cloud Sync
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React Native (TypeScript)
- **Camera**: react-native-camera / expo-camera
- **Navigation**: React Navigation

### AI/ML
- **Pose Detection**: MediaPipe Pose
- **ML Framework**: TensorFlow Lite
- **Processing**: On-device inference (≥15 fps)

### AR
- **iOS**: ARKit
- **Android**: ARCore
- **Rendering**: WebGL / Canvas

### Backend (Optional)
- **Database**: Firebase Firestore / SQLite
- **Authentication**: Firebase Auth (Email, Google)
- **Storage**: Local-first with cloud sync

### Audio
- **TTS**: react-native-tts

## 📱 Supported Exercises

### MVP (Phase 1)
- Squats
- Push-ups
- Lunges
- Planks

### Future Additions
- Deadlifts
- Burpees
- Jumping Jacks
- Custom user-defined exercises

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS, macOS only)
- Firebase account (for cloud features)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd AR-Home-Fitness-Coach

# Install dependencies
npm install

# iOS specific
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Configuration

1. **Firebase Setup** (optional for cloud sync):
   - Create a Firebase project
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place in respective directories

2. **Camera Permissions**:
   - iOS: Update `Info.plist` with camera usage description
   - Android: Update `AndroidManifest.xml` with camera permissions

## 📊 Development Roadmap

| Phase | Timeline | Features |
|-------|----------|----------|
| **MVP** | Weeks 1-8 | Camera, pose detection, rep counting, basic feedback |
| **Phase 2** | Weeks 9-12 | AR overlay, audio feedback, custom exercises |
| **Phase 3** | Weeks 13-16 | Analytics, recommendations, cloud sync |
| **Phase 4** | Weeks 17-22 | Gamification, 3D avatar, multi-language |

See [implementation_plan.md](file:///C:/Users/hp/.gemini/antigravity/brain/7ad8f649-e67e-4269-9014-9a56e0a14c33/implementation_plan.md) for detailed technical plan.

## 🎨 UI/UX Highlights

- **Minimalistic Design**: Clean camera-focused interface
- **High Contrast Feedback**: Red/yellow/green color coding
- **Smooth Animations**: AR skeleton with fluid transitions
- **Responsive Layout**: Portrait and landscape support
- **Accessibility**: Large fonts, color-blind friendly

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run on specific device
npm run android -- --deviceId=<device-id>
npm run ios -- --simulator="iPhone 14"
```

## 📈 Performance Targets

- **Frame Rate**: ≥15 fps for smooth AR rendering
- **Latency**: <100ms pose detection to feedback
- **Battery**: <20% drain per 30-minute workout
- **Devices**: iPhone 11+ (iOS 15+), Android 11+ (2019+ devices)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [MediaPipe](https://google.github.io/mediapipe/) for pose estimation
- [TensorFlow](https://www.tensorflow.org/) for ML framework
- [React Native](https://reactnative.dev/) for cross-platform development

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for fitness enthusiasts**

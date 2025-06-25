# 🎬 React Native Movie Explorer

This is a **React Native** project I'm building as part of my self-learning journey. The app fetches movie data using **The Movie Database (TMDB)** API and allows users to:

- Browse a list of movies(infinite scroll)
- Sort them by popularity or rating
- Mark movies as favorites
- Persist favorites using local storage

---

## 📱 Features

- 🔍 **Movie List**: Fetches and displays movies from TMDB
- ⭐ **Favorites**: Users can mark/unmark movies as favorites
- 📦 **State Management**: Handled using Redux
- 💾 **Persistence**: Favorite movies are saved using AsyncStorage
- 🔃 **Sorting**: Allows sorting by rating or popularity
- 🔃 **Nearby theaters**: Show the nearby theaters based on the given zipcode(Using the google map api)
---

## 🧰 Technologies Used

- **React Native**
- **Redux Toolkit**
- **React Navigation**
- **AsyncStorage**
- **TMDB API**
- **TypeScript**

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- Xcode / Android Studio for iOS/Android builds
- TMDB API Key (free to get from [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api))

### Installation

```bash
git clone https://github.com/khushbooneema/ReactNative.git
cd ReactNative
npm install
cd ios && pod install && cd ..

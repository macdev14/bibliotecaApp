// import * as DocumentPicker from 'expo-document-picker';
// import * as FileSystem from 'expo-file-system';

// export const handleFileSelection = async () => {
//   try {
//     const res = await DocumentPicker.getDocumentAsync();

//     if (res.type === 'success') {
//       const { uri, name } = res;

//       const destinationPath = `${FileSystem.documentDirectory}${name}`;

//       await FileSystem.copyAsync({
//         from: uri,
//         to: destinationPath,
//       });
//       return destinationPath; // Update the selected file path state
//     }
//   } catch (error) {
//     console.log('Error picking file:', error);
//   }
// };

  
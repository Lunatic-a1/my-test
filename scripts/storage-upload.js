import { storage } from './firebase-init.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

/**
 * 파일을 Firebase Storage에 업로드하고 다운로드 URL을 반환합니다.
 * @param {File} file - 업로드할 파일 객체
 * @param {string} path - Storage 내 저장 경로 (예: 'artworks/작품ID/poster.jpg')
 * @returns {Promise<string>} 다운로드 URL
 */
export async function uploadImageToStorage(file, path) {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
}

// 사용 예시:
// const url = await uploadImageToStorage(file, `artworks/${artworkId}/poster.jpg`); 
const latestMoreBtnStyle = `
#latest-more-btn {
  color: #888;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 12px;
  transition: color 0.2s;
}
#latest-more-btn:hover {
  color: #222;
}
`;
const styleTag = document.createElement('style');
styleTag.innerHTML = latestMoreBtnStyle;
document.head.appendChild(styleTag); 
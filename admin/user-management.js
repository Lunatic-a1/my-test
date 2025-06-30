import { app } from "../scripts/firebase-init.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const db = getFirestore(app);

const PAGE_SIZE = 10;
let currentPage = 1;
let allUsers = [];
let filteredUsers = [];

document.addEventListener("DOMContentLoaded", async () => {
    await loadUsers();
    document.getElementById('search-input').addEventListener('input', handleSearch);
});

async function loadUsers() {
    const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(usersQuery);
    allUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    filteredUsers = allUsers;
    renderPage(1);
}

function renderPage(page) {
    currentPage = page;
    const tbody = document.getElementById('user-list-tbody');
    tbody.innerHTML = '';

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const usersToRender = filteredUsers.slice(start, end);

    usersToRender.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.userId || '-'}</td>
            <td>${user.email}</td>
            <td>${user.nickname || '-'}</td>
            <td>${formatDate(user.createdAt)}</td>
            <td>${user.status || '활성'}</td>
            <td>
                <button class="action-btn">수정</button>
                <button class="action-btn">정지</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderPagination();
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => renderPage(i));
        paginationContainer.appendChild(button);
    }
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filterType = document.getElementById('search-filter').value;

    if (!searchTerm) {
        filteredUsers = allUsers;
    } else {
        filteredUsers = allUsers.filter(user => {
            const value = user[filterType] ? user[filterType].toLowerCase() : "";
            return value.includes(searchTerm);
        });
    }
    renderPage(1);
}

function formatDate(ts) {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
} 
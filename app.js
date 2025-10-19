// Archivo principal que inicializa la aplicación
class PWAApp {
    constructor() {
        this.init();
    }

    init() {
        // Registrar Service Worker
        this.registerServiceWorker();
        
        // Monitorear estado de conexión
        this.monitorConnection();
        
        console.log('PWA App inicializada');
    }

    // Registrar Service Worker
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Error al registrar Service Worker:', error);
                });
        }
    }

    // Monitorear estado de conexión
    monitorConnection() {
        const connectionStatus = document.getElementById('connectionStatus');
        
        const updateConnectionStatus = () => {
            if (navigator.onLine) {
                connectionStatus.textContent = 'Conectado';
                connectionStatus.className = 'connection-status online';
            } else {
                connectionStatus.textContent = 'Sin conexión';
                connectionStatus.className = 'connection-status offline';
            }
            
            setTimeout(() => {
                connectionStatus.style.opacity = '0';
            }, 3000);
        };

        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        
        updateConnectionStatus();
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PWAApp();
});

// Manejo de navegación y menú
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.contentSections = document.querySelectorAll('.content-section');
        this.menuToggle = document.getElementById('menuToggle');
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('overlay');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navegación entre secciones
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e, link));
        });

        // Menú móvil
        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        this.overlay.addEventListener('click', () => this.closeMobileMenu());
    }

    handleNavigation(e, link) {
        e.preventDefault();
        
        // Remover clase activa de todos los enlaces
        this.navLinks.forEach(l => l.classList.remove('active'));
        
        // Agregar clase activa al enlace clickeado
        link.classList.add('active');
        
        // Ocultar todas las secciones
        this.contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección correspondiente
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Cerrar menú en móvil
        if (window.innerWidth <= 768) {
            this.closeMobileMenu();
        }
    }

    toggleMobileMenu() {
        this.sidebar.classList.toggle('open');
        this.overlay.classList.toggle('active');
    }

    closeMobileMenu() {
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('active');
    }
}

// Inicializar navegación
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// Manejo de la sección de productos
class ProductsManager {
    constructor() {
        this.productsGrid = document.getElementById('productsGrid');
        this.productsLoading = document.getElementById('productsLoading');
        this.products = [];
        
        this.init();
    }

    init() {
        this.loadProducts();
    }

    loadProducts() {
        // Simular datos de productos
        this.products = [
            { id: 1, name: "Laptop Gamer", price: 1299.99, category: "Tecnología" },
            { id: 2, name: "Smartphone", price: 599.99, category: "Tecnología" },
            { id: 3, name: "Auriculares Bluetooth", price: 89.99, category: "Audio" }
        ];

        // Simular tiempo de carga
        setTimeout(() => {
            this.renderProducts();
        }, 1500);
    }

    renderProducts() {
        this.productsLoading.style.display = 'none';
        
        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            this.productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${product.name}
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        `;
        
        return productCard;
    }
}

// Inicializar productos
document.addEventListener('DOMContentLoaded', () => {
    new ProductsManager();
});

// Manejo de la sección de noticias
class NewsManager {
    constructor() {
        this.newsList = document.getElementById('newsList');
        this.newsLoading = document.getElementById('newsLoading');
        this.news = [];
        
        this.init();
    }

    init() {
        this.loadNews();
    }

    loadNews() {
        // Simular datos de noticias
        this.news = [
            { 
                id: 1, 
                title: "Nueva actualización de la PWA", 
                date: "2023-05-15", 
                content: "Hemos lanzado una nueva actualización que mejora el rendimiento offline." 
            },
            { 
                id: 2, 
                title: "Funcionalidades añadidas", 
                date: "2023-05-10", 
                content: "Se han añadido nuevas secciones para mostrar contenido dinámico." 
            }
        ];

        // Simular tiempo de carga
        setTimeout(() => {
            this.renderNews();
        }, 1200);
    }

    renderNews() {
        this.newsLoading.style.display = 'none';
        
        this.news.forEach(newsItem => {
            const newsElement = this.createNewsElement(newsItem);
            this.newsList.appendChild(newsElement);
        });
    }

    createNewsElement(newsItem) {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        newsElement.style.padding = '1rem';
        newsElement.style.marginBottom = '1rem';
        newsElement.style.backgroundColor = 'white';
        newsElement.style.borderRadius = '8px';
        newsElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        
        newsElement.innerHTML = `
            <h3>${newsItem.title}</h3>
            <p><small>${newsItem.date}</small></p>
            <p>${newsItem.content}</p>
        `;
        
        return newsElement;
    }
}

// Inicializar noticias
document.addEventListener('DOMContentLoaded', () => {
    new NewsManager();
});

// Manejo de la sección de tareas
class TasksManager {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.tasks = [];
        
        this.init();
    }

    init() {
        this.loadTasks();
        this.setupEventListeners();
    }

    loadTasks() {
        // Cargar tareas desde localStorage
        const savedTasks = localStorage.getItem('pwa-tasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        this.renderTasks();
    }

    setupEventListeners() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (taskText) {
            this.tasks.push({ 
                text: taskText, 
                completed: false,
                id: Date.now()
            });
            this.saveTasks();
            this.taskInput.value = '';
            this.renderTasks();
        }
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('pwa-tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        
        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.style.display = 'flex';
            taskItem.style.justifyContent = 'space-between';
            taskItem.style.alignItems = 'center';
            taskItem.style.padding = '0.75rem';
            taskItem.style.marginBottom = '0.5rem';
            taskItem.style.backgroundColor = 'white';
            taskItem.style.borderRadius = '4px';
            taskItem.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-task" data-index="${index}">Eliminar</button>
            `;
            
            this.taskList.appendChild(taskItem);
        });
        
        // Agregar event listeners a botones de eliminar
        document.querySelectorAll('.delete-task').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.deleteTask(index);
            });
        });
    }
}

// Inicializar tareas
document.addEventListener('DOMContentLoaded', () => {
    new TasksManager();
});
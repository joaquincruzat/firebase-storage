<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">Home</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div class="container">
                  <li class="d-flex justify-content-left">
                    <router-link to="/events" style="text-decoration: none"
                      >Crea tu evento</router-link
                    >
                  </li>
                </div>
                <li><hr class="dropdown-divider" /></li>
                <div class="container">
                  <li class="d-flex justify-content-left">
                    <router-link to="/admin" style="text-decoration: none"
                      >Administrar</router-link
                    >
                  </li>
                </div>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <!-- Iniciar sesión -->
          <button
            type="button"
            class="btn btn-outline-primary mx-2"
            data-bs-toggle="modal"
            data-bs-target="#login"
          >
            Log in
          </button>
          <!-- Cerrar sesión -->
          <button
            class="btn btn-outline-danger me-2"
            data-bs-toggle="modal"
            data-bs-target="#login"
            @click="signout"
          >
            Log out
          </button>
          <!-- Regístrate -->
          <button
            type="button"
            class="btn btn-outline-warning"
            data-bs-toggle="modal"
            data-bs-target="#registro"
          >
            <!-- inicia modal con id="registro" -->
            Regístrate
          </button>
        </div>
      </div>
    </nav>
    <!-- //// Modal - Registrarse //// -->
    <div
      class="modal fade"
      id="registro"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Regístrate</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="register()">
              <!-- CORREO -->
              <div class="input-group mb-3">
                <span class="input-group-text">Correo</span>
                <input
                  v-model="user.email"
                  type="email"
                  required="true"
                  class="form-control"
                />
              </div>
              <!-- PASSWORD -->
              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input
                  v-model="user.password"
                  type="password"
                  required="true"
                  class="form-control"
                />
              </div>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- //// Modal - Iniciar sesión //// -->
    <div class="modal fade" id="login">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Inicio de sesión</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="login()">
              <!-- CORREO -->
              <div class="input-group mb-3">
                <span class="input-group-text">Correo</span>
                <input
                  v-model="user.email"
                  type="email"
                  required="true"
                  class="form-control"
                />
              </div>
              <!-- PASSWORD -->
              <div class="input-group mb-3">
                <span class="input-group-text">Password</span>
                <input
                  v-model="user.password"
                  type="password"
                  required="true"
                  class="form-control"
                />
              </div>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  <!-- Cierra el modal -->
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Cierre NavBar -->
</template>
<script>
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return {
      user: {
        email: "",
        password: "",
        errorMessage: "",
      },
    };
  },
  methods: {
    async register() {
      const { email, password } = this.user;
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("¡Registrado!");
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
          // ..
        });
    },
    async login() {
      const { email, password } = this.user;
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("¡Sesión iniciada!");
          // Signed in
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
        });
    },
    signout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert("¡Sesión cerrada! Inicia sesión.");
        })
        .catch((error) => {});
    },
  },
};
</script>

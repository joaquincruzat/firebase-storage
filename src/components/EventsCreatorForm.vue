<template>
  <div class="container my-4">
    <form>
      <div class="input-group mb-3">
        <span class="input-group-text">Nombre</span>
        <input v-model="event.name" type="text" class="form-control" />
      </div>
      <!-- Lugar -->
      <div class="input-group mb-3">
        <span class="input-group-text">Lugar</span>
        <input v-model="event.place" type="text" class="form-control" />
      </div>
      <!-- Descripción -->
      <div class="input-group mb-3">
        <span class="input-group-text">Descripción</span>
        <input v-model="event.desc" type="text" class="form-control" />
      </div>
      <div class="input-group my-3">
        <input type="file" @change="selectImg($event)" />
      </div>
      <div class="mt-4">
        <h5 class="d-flex justify-content-start">Vista previa</h5>
        <img :src="selectedImg" />
      </div>
      <!-- Botone Guardar -->
      <div class="mt-3">
        <button @click.prevent="addEvent()" class="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { db, storageRef } from "../main";
import router from "@/router";

export default {
  name: "EventsTable",
  data() {
    return {
      events: [],
      event: {
        name: "",
        place: "",
        desc: "",
      },
      img: "",
      selectedImg: null,
    };
  },
  methods: {
    // GET / OBTENER / Consulta instantánea
    async getEvents() {
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((doc) => {
        let event = doc.data();
        event.id = doc.id;
        this.events.push(event);
        console.log(event);
      });
    },
    async addEvent() {
      try {
        await storageRef.child("images").child(this.img.name).put(this.img);
        const urlImg = await storageRef
          .child("images")
          .child(this.img.name)
          .getDownloadURL();
        await addDoc(collection(db, "events"), {
          name: this.event.name,
          place: this.event.place,
          desc: this.event.desc,
          img: urlImg,
        });
        this.error = "Imagen subida con éxito";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        router.push("/");
      }
    },
    async selectImg(event) {
      console.log(event.target.files[0]);
      const typeImg = event.target.files[0].type;
      if (typeImg === "image/jpeg" || typeImg === "image/png") {
        this.img = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no válido";
        this.img = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.img);
      reader.onload = (e) => {
        this.selectedlImg = e.target.result;
      };
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>

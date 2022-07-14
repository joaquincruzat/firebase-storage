<template>
  <div class="container">
    <!-- Tabla de eventos -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Lugar</th>
          <th scope="col">Descripción</th>
          <th scope="col">ID</th>
          <th scope="col">Eliminar</th>
          <!-- Falta boton y logica EDITAR -->
          <!-- <th scope="col">Editar</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="index">
          <td>{{ event.name }}</td>
          <td>{{ event.place }}</td>
          <td>{{ event.desc }}</td>
          <td>{{ event.id }}</td>
          <td>
            <button
              @click.prevent="deleteEvent(event.id)"
              class="btn btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore/lite";
import { db } from "../main";
import EventsCreatorForm from "./EventsCreatorForm.vue";

export default {
  name: "EventsTable",
  data() {
    return {
      events: [],
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
    // async getEventByID(id) {
    //   const docRef = doc(db, "events", id);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     this.event = docSnap.data();
    //     this.event.id = docSnap.id;
    //   } else {
    //     console.log("¡No existe el documento!");
    //   }
    // },
    async deleteEvent(id) {
      await deleteDoc(doc(db, "events", id));
    },
  },
  mounted() {
    this.getEvents();
  },
  components: { EventsCreatorForm },
};
</script>

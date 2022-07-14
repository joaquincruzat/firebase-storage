<template>
  <div>
    <div class="container my-5">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="(event, index) in events" :key="index">
          <div class="card">
            <img :src="event.img" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ event.name }}</h5>
              <p class="card-text">{{ event.place }}</p>
              <p class="card-text">{{ event.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../main";

export default {
  name: "EventsTable",
  data() {
    return {
      events: [],
      event: {
        name: "",
        place: "",
        desc: "",
        img: "",
      },
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
  },
  mounted() {
    this.getEvents();
  },
};
</script>

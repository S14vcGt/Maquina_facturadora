<template>
    <div class="neomorph-clock">
      <div class="clock-container">
        <p class="date">{{ formattedDate }}</p>
        <p class="time">{{ formattedTime }}</p>
        <p class="numCaja">{{getNumcaja}}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentDateTime: new Date(),
        numCaja: 1
      };
    },
    computed: {
      getNumcaja(){
        return `Caja${this.numCaja}`
      },
      formattedDate() {
        return this.currentDateTime.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
      formattedTime() {
        return this.currentDateTime.toLocaleTimeString('es-ES');
      },
    },
    created() {
      this.updateTime();
    },
    methods: {
      updateTime() {
        setInterval(() => {
          this.currentDateTime = new Date();
        }, 1000);
      },
    },
  };
  </script>
  
  <style scoped>
  .neomorph-clock {
    display: flex;
    justify-content: left;
    align-items: top;
    height: 200px;
    width: 300px;
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 
      8px 8px 16px #bebebe,
      -8px -8px 16px #ffffff;
  }
  
  .clock-container {
    text-align: center;
    color: #333;
    margin-top: 1rem;
    margin-left: 1rem;
  }
  
  .date,
  .time,
  .numCaja {
    margin: 0.2rem 0; /* Ajusta el margen superior e inferior a 0.2rem */
  }
  .date {
    text-align: left;
    font-size: 1.2rem;
  }
  
  .time {
    text-align: left;
    font-size: 3.7rem;
    font-weight: bold;
  }
  .numCaja{
    text-align: left;
    font-size: 1.2rem;
  }
  </style>
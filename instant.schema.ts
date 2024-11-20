// tuono
// https://instantdb.com/dash?s=main&t=home&app=bd7b55f0-2338-4b87-8b7a-44ed0df6ae13

import { i } from "@instantdb/react";

const graph = i.graph(
  {
    admins: i.entity({
      email: i.any().unique(),
      fullName: i.any(),
      handle: i.any().unique().indexed(),
    }),
    appointments: i.entity({
      time: i.any(),
      duration: i.any(),
    }),
    conversations: i.entity({
      created: i.any(),
      lastUpdated: i.any(),
      messages: i.any(),
    }),
    exercises: i.entity({
      aliases: i.any().indexed(),
      bodyParts: i.any().indexed(),
      difficulty: i.any().indexed(),
      holdTimeInSeconds: i.any(),
      imageUrls: i.any(),
      repetitions: i.any(),
      sets: i.any(),
      steps: i.any(),
      title: i.any().indexed(),
      weight: i.any(),
    }),
    patients: i.entity({
      email: i.any(),
      firstName: i.any(),
      lastName: i.any().indexed(),
      phone: i.any().unique(),
    }),
    routines: i.entity({
      created: i.any(),
      name: i.any().indexed(),
      steps: i.any(),
    }),
  },
  {
    conversationsAdmin: {
      forward: {
        on: "conversations",
        has: "one",
        label: "admin",
      },
      reverse: {
        on: "admins",
        has: "many",
        label: "conversations",
      },
    },
    conversationsPatient: {
      forward: {
        on: "conversations",
        has: "one",
        label: "patient",
      },
      reverse: {
        on: "patients",
        has: "many",
        label: "conversations",
      },
    },
    appointmentsPatient: {
      forward: {
        on: "appointments",
        has: "one",
        label: "patient",
      },
      reverse: {
        on: "patients",
        has: "many",
        label: "appointments",
      },
    },
    exercisesAdmin: {
      forward: {
        on: "exercises",
        has: "one",
        label: "admin",
      },
      reverse: {
        on: "admins",
        has: "many",
        label: "exercises",
      },
    },
    patientsAdmin: {
      forward: {
        on: "patients",
        has: "one",
        label: "admin",
      },
      reverse: {
        on: "admins",
        has: "many",
        label: "patients",
      },
    },
    routinesAdmin: {
      forward: {
        on: "routines",
        has: "one",
        label: "admin",
      },
      reverse: {
        on: "admins",
        has: "many",
        label: "routines",
      },
    },
    appointmentsAdmin: {
      forward: {
        on: "appointments",
        has: "one",
        label: "admin",
      },
      reverse: {
        on: "admins",
        has: "many",
        label: "appointments",
      },
    },
  },
);

export default graph;

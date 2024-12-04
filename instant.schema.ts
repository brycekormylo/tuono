// tuono
// https://instantdb.com/dash?s=main&t=home&app=bd7b55f0-2338-4b87-8b7a-44ed0df6ae13
// npx instant-cli push-schema

import { i } from "@instantdb/react";
import type { Message } from "./contexts/conversations";

const graph = i.graph(
	{
		admins: i.entity({
			email: i.string().unique(),
			fullName: i.string(),
			handle: i.string().unique().indexed(),
			created: i.string(),
		}),
		appointments: i.entity({
			date: i.string(),
			durationInMinutes: i.number(),
		}),
		conversations: i.entity({
			created: i.string(),
			lastUpdated: i.string(),
			messages: i.json<Message>(),
		}),
		exercises: i.entity({
			aliases: i.string().indexed(),
			bodyParts: i.any().indexed(),
			difficulty: i.any().indexed(),
			holdTimeInSeconds: i.number(),
			imageUrls: i.string(),
			repetitions: i.number(),
			sets: i.number(),
			steps: i.any(),
			title: i.string().indexed(),
			weight: i.number(),
		}),
		patients: i.entity({
			created: i.string(),
			email: i.string(),
			firstName: i.string(),
			lastName: i.string().indexed(),
			phone: i.string().unique(),
			dob: i.string(),
			homeAddress: i.string(),
		}),
		routines: i.entity({
			created: i.any(),
			name: i.string().indexed(),
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

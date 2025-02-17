// tuono
// https://instantdb.com/dash?s=main&t=home&app=bd7b55f0-2338-4b87-8b7a-44ed0df6ae13
// npx instant-cli push-schema

import { i } from "@instantdb/react";

const graph = i.graph(
	{
		$users: i.entity({
			email: i.string().unique().indexed(),
		}),

		profiles: i.entity({
			firstName: i.string(),
			lastName: i.string(),
			phone: i.string().unique(),
			isAdmin: i.boolean(),
			created: i.date(),
			email: i.string().unique().indexed(),
		}),

		// Links need to move to admins/patients instead of to profiles
		admins: i.entity({
			handle: i.string().unique().indexed().optional(),
		}),

		patients: i.entity({
			email: i.string().unique().indexed(),
			created: i.string().optional(),
			dob: i.string().optional(),
			homeAddress: i.string().optional(),
			occupation: i.string().optional(),
			sex: i.string().optional(),
			enthicity: i.string().optional(),
			emergencyPhone: i.string().optional(),
		}),

		appointments: i.entity({
			date: i.date(),
			appointmentType: i.any(),
		}),

		conversations: i.entity({
			created: i.date(),
		}),

		messages: i.entity({
			content: i.string(),
			timestamp: i.date(),
			fromAdmin: i.boolean(),
			seen: i.boolean(),
		}),

		exercises: i.entity({
			aliases: i.any().indexed().optional(),
			bodyParts: i.any().indexed().optional(),
			difficulty: i.any().indexed().optional(),
			holdTimeInSeconds: i.number().optional(),
			imageUrls: i.any().optional(),
			repetitions: i.number().optional(),
			sets: i.number().optional(),
			steps: i.any().optional(),
			title: i.string().indexed(),
			weight: i.number().optional(),
		}),

		routines: i.entity({
			created: i.any().optional(),
			name: i.string().indexed(),
			steps: i.any().optional(),
		}),
	},

	{
		userProfile: {
			forward: {
				on: "profiles",
				has: "one",
				label: "user",
			},
			reverse: {
				on: "$users",
				has: "one",
				label: "profile",
			},
		},

		profileAdmin: {
			forward: {
				on: "profiles",
				has: "one",
				label: "admin",
			},
			reverse: {
				on: "admins",
				has: "one",
				label: "profile",
			},
		},

		profilePatient: {
			forward: {
				on: "profiles",
				has: "one",
				label: "patient",
			},
			reverse: {
				on: "patients",
				has: "one",
				label: "profile",
			},
		},

		adminPatients: {
			forward: {
				on: "admins",
				has: "many",
				label: "patients",
			},
			reverse: {
				on: "patients",
				has: "one",
				label: "admin",
			},
		},

		conversationAdmin: {
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

		conversationPatient: {
			forward: {
				on: "conversations",
				has: "one",
				label: "patient",
			},
			reverse: {
				on: "patients",
				has: "one",
				label: "conversation",
			},
		},

		conversationMessages: {
			forward: {
				on: "conversations",
				has: "many",
				label: "messages",
			},
			reverse: {
				on: "messages",
				has: "one",
				label: "conversation",
			},
		},

		appointmentsProfile: {
			forward: {
				on: "profiles",
				has: "many",
				label: "appointments",
			},
			reverse: {
				on: "appointments",
				has: "one",
				label: "profile",
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

		messagesProfile: {
			forward: {
				on: "messages",
				has: "one",
				label: "sender",
			},
			reverse: {
				on: "profiles",
				has: "many",
				label: "messages",
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
	},
);

export default graph;

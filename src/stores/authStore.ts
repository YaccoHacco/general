import { app } from "../F/fb";
import { getAuth } from "firebase/auth"
import type { Auth } from "firebase/auth";
import { writable } from "svelte/store";

export const authStore = writable<Auth|null>(getAuth(app));
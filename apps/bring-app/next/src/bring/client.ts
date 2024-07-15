"use client";

import {env} from "@/env.mjs";
import {initClient} from "@bring/blocks-client";
import type {EP} from "./types";

export const {useDynamicEntityProps, useWPSendForm} = initClient<EP>(
	env.NEXT_PUBLIC_WP_BASE_URL,
);

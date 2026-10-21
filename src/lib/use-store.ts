"use client";

import { useSyncExternalStore } from "react";
import {
  DataStore,
  INITIAL_PROFILES,
  INITIAL_PELANGGAN,
  INITIAL_PENJUALAN,
  INITIAL_BAHAN,
  INITIAL_RESEP,
} from "./data-store";
import { Bahan, Pelanggan, Penjualan, Profile, Resep } from "@/types";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("dapur_data_changed", callback);
  window.addEventListener("dapur_user_changed", callback);
  return () => {
    window.removeEventListener("dapur_data_changed", callback);
    window.removeEventListener("dapur_user_changed", callback);
  };
}

const getCurrentUserSnapshot = () => DataStore.getCurrentUser();
const getInitialUserSnapshot = () => INITIAL_PROFILES[0];

const getPelangganSnapshot = () => DataStore.getPelanggan();
const getInitialPelangganSnapshot = () => INITIAL_PELANGGAN;

const getPenjualanSnapshot = () => DataStore.getPenjualan();
const getInitialPenjualanSnapshot = () => INITIAL_PENJUALAN;

const getBahanSnapshot = () => DataStore.getBahan();
const getInitialBahanSnapshot = () => INITIAL_BAHAN;

const getResepSnapshot = () => DataStore.getResep();
const getInitialResepSnapshot = () => INITIAL_RESEP;

const getProfilesSnapshot = () => DataStore.getProfiles();
const getInitialProfilesSnapshot = () => INITIAL_PROFILES;

export function useCurrentUser(): Profile {
  return useSyncExternalStore(
    subscribe,
    getCurrentUserSnapshot,
    getInitialUserSnapshot
  );
}

export function usePelangganList(): Pelanggan[] {
  return useSyncExternalStore(
    subscribe,
    getPelangganSnapshot,
    getInitialPelangganSnapshot
  );
}

export function usePenjualanList(): Penjualan[] {
  return useSyncExternalStore(
    subscribe,
    getPenjualanSnapshot,
    getInitialPenjualanSnapshot
  );
}

export function useBahanList(): Bahan[] {
  return useSyncExternalStore(
    subscribe,
    getBahanSnapshot,
    getInitialBahanSnapshot
  );
}

export function useResepList(): Resep[] {
  return useSyncExternalStore(
    subscribe,
    getResepSnapshot,
    getInitialResepSnapshot
  );
}

export function useProfilesList(): Profile[] {
  return useSyncExternalStore(
    subscribe,
    getProfilesSnapshot,
    getInitialProfilesSnapshot
  );
}

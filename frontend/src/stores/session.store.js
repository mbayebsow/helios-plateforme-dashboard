import Cookies from "js-cookie";
import { createStore, createHook } from "react-sweet-state";
import { getUserSession } from "../components/functions/auth.func";

const Store = createStore({
  initialState: { status: "loading", session: "loading", user: "loading" },
  actions: {
    setSession:
      () =>
      async ({ setState }) => {
        const session = await Cookies.get("helios_session");
        if (session) {
          const user = await getUserSession();
          setState({ session, user });
          return;
        } else {
          setState({ session: null, user: null });
        }
      },
  },
});
//export const sessionStore = createHook(Store);

export default function UseSession() {
  const sessionStore = createHook(Store);
  const [state, { setSession }] = sessionStore();

  return {
    setSession,
    state,
  };
}

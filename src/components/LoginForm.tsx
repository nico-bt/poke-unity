"use client";

import { actions } from "@/actions";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export function LoginForm() {
  const initialState: { error: string | null } = { error: null };

  const [state, loginAction] = useActionState(actions.auth.login, initialState);
  const [password, setPassword] = useState(""); //client side validation

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4 mt-8">
      <div className="w-full max-w-[400px] bg-linear-to-br from-white to-slate-100 rounded-2xl shadow-2xl border border-pink-100 p-8 animate-fadeInUpShort">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-black mb-2 [font-variant:small-caps]">
            Admin
          </h2>
          <p className="text-gray-600">Sign in</p>
        </div>

        <form action={loginAction} className="flex flex-col gap-6" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 ml-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:outline-none shadow-sm"
              style={state?.error ? { border: "1px solid red" } : {}}
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {state?.error && (
              <p className="text-sm text-red-600 ml-6">{state.error}</p>
            )}
          </div>

          <SubmitButton disabled={!password.trim()} />
        </form>
      </div>
    </div>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || disabled}
      type="submit"
      className="w-full py-3.5 px-6 bg-yellow-400 text-black font-semibold 
               rounded-xl hover:bg-yellow-500 cursor-pointer focus:outline-none focus:ring-4 
               focus:ring-pink-200 transition-all duration-200 disabled:bg-gray-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg transform hover:scale-[1.02] active:scale-[0.98]
               relative overflow-hidden group"
    >
      <span className="relative z-10">
        {pending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </span>
    </button>
  );
}

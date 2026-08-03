import { AppShell } from "./layouts/AppShell";
import { AppProviders } from "./providers";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  return (
    <AppProviders>
      <AppShell>
        <AppRouter />
      </AppShell>
    </AppProviders>
  );
}

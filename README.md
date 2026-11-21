# Basecoat Blocks

**Beautifully designed, copy-and-paste blocks built with [Basecoat](https://basecoatui.com/).**  
Framework agnostic. Open source. Own the code.

> Built on **[Basecoat](https://github.com/hunvreus/basecoat)** by [@hunvreus](https://github.com/hunvreus): shadcn/ui-style components for any web stack, no React required. Docs and components: [basecoatui.com](https://basecoatui.com/).  
> **Independent community project. Not affiliated with or endorsed by Basecoat.**

<!-- overview:start -->
**34 blocks** · Basecoat 1.2.1 · plain HTML · light + dark

**Jump to:** [Authentication (6)](#authentication) · [Sidebar (3)](#sidebar) · [Dashboard (1)](#dashboard) · [Application (18)](#application) · [Marketing (6)](#marketing) · [Find by component](#find-by-component)
<!-- overview:end -->

Original HTML-first patterns for sign-in, sidebars, dashboards, app screens and marketing pages. There is no website, package or CLI: **this README is the catalog**. Pick a screenshot, open its code, paste it into your page. Every block is set in the same fictional company, **Acme Inc.**, so the placeholder name is obvious to replace. Screenshots follow your GitHub theme.

## Quick start

The blocks are plain HTML with Basecoat component classes and Tailwind utilities for layout, the same way the [Basecoat docs](https://basecoatui.com/) write their examples. You need a project with **Tailwind CSS 4** and **Basecoat 1.2.1**.

1. **Set up Basecoat once** (skip if your project already has it):

   ```sh
   npm install basecoat-css@1.2.1
   ```

   ```css
   /* your main CSS file */
   @import "tailwindcss";
   @import "basecoat-css";
   ```

   Blocks marked **needs Basecoat JS** also need Basecoat's JavaScript, loaded once (`import "basecoat-css/all";` in your bundle, or a script tag):

   ```html
   <script src="https://cdn.jsdelivr.net/npm/basecoat-css@1.2.1/dist/js/all.min.js" defer></script>
   ```

2. **Copy a block:** click a screenshot (or **Code**) to open its `block.html`, then use GitHub's *Copy raw file* button.
3. **Paste it into your template** and replace the Acme copy, links, data and form actions with your own. Tailwind picks up the utility classes when it scans your templates.

No React, Vue or component framework. No `<style>` blocks or custom class names to carry around.

## Browse the blocks

Under each screenshot: the Basecoat components it uses, whether it needs Basecoat JavaScript, and links to the code and its usage notes.

<!-- catalog:start -->
### Authentication

6 blocks · [category notes](blocks/authentication/README.md) · [back to top](#basecoat-blocks)

| Simple Login · `login-01` | Split Screen Login · `login-02` |
| --- | --- |
| <a href="blocks/authentication/login-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/authentication/login-01/preview-dark.png"><img src="blocks/authentication/login-01/preview.png" alt="Simple Login preview"></picture></a> | <a href="blocks/authentication/login-02/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/authentication/login-02/preview-dark.png"><img src="blocks/authentication/login-02/preview.png" alt="Split Screen Login preview"></picture></a> |
| <sub>Button · Field · Input · Checkbox</sub><br>[Code](blocks/authentication/login-01/block.html) · [Notes](blocks/authentication/login-01/README.md) | <sub>Button · Field · Input · Checkbox</sub><br>[Code](blocks/authentication/login-02/block.html) · [Notes](blocks/authentication/login-02/README.md) |

| Card Login · `login-03` | Signup · `signup-01` |
| --- | --- |
| <a href="blocks/authentication/login-03/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/authentication/login-03/preview-dark.png"><img src="blocks/authentication/login-03/preview.png" alt="Card Login preview"></picture></a> | <a href="blocks/authentication/signup-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/authentication/signup-01/preview-dark.png"><img src="blocks/authentication/signup-01/preview.png" alt="Signup preview"></picture></a> |
| <sub>Card · Field · Input · Checkbox · Button</sub><br>[Code](blocks/authentication/login-03/block.html) · [Notes](blocks/authentication/login-03/README.md) | <sub>Card · Field · Input · Checkbox · Button</sub><br>[Code](blocks/authentication/signup-01/block.html) · [Notes](blocks/authentication/signup-01/README.md) |

| Email Verification · `otp-01` | Forgot Password · `forgot-password-01` |
| --- | --- |
| <a href="blocks/authentication/otp-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/authentication/otp-01/preview-dark.png"><img src="blocks/authentication/otp-01/preview.png" alt="Email Verification preview"></picture></a> | <a href="blocks/authentication/forgot-password-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/authentication/forgot-password-01/preview-dark.png"><img src="blocks/authentication/forgot-password-01/preview.png" alt="Forgot Password preview"></picture></a> |
| <sub>Card · Field · Input OTP · Button · <b>needs Basecoat JS</b></sub><br>[Code](blocks/authentication/otp-01/block.html) · [Notes](blocks/authentication/otp-01/README.md) | <sub>Alert · Field · Input · Button</sub><br>[Code](blocks/authentication/forgot-password-01/block.html) · [Notes](blocks/authentication/forgot-password-01/README.md) |

### Sidebar

3 blocks · [category notes](blocks/sidebar/README.md) · [back to top](#basecoat-blocks)

| Basic Sidebar · `sidebar-01` | Workspace Sidebar · `sidebar-02` |
| --- | --- |
| <a href="blocks/sidebar/sidebar-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/sidebar/sidebar-01/preview-dark.png"><img src="blocks/sidebar/sidebar-01/preview.png" alt="Basic Sidebar preview"></picture></a> | <a href="blocks/sidebar/sidebar-02/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/sidebar/sidebar-02/preview-dark.png"><img src="blocks/sidebar/sidebar-02/preview.png" alt="Workspace Sidebar preview"></picture></a> |
| <sub>Sidebar · Button · Badge · Card · <b>needs Basecoat JS</b></sub><br>[Code](blocks/sidebar/sidebar-01/block.html) · [Notes](blocks/sidebar/sidebar-01/README.md) | <sub>Sidebar · Button · Badge · Card · <b>needs Basecoat JS</b></sub><br>[Code](blocks/sidebar/sidebar-02/block.html) · [Notes](blocks/sidebar/sidebar-02/README.md) |

| Nested Sidebar · `sidebar-03` |
| --- |
| <a href="blocks/sidebar/sidebar-03/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/sidebar/sidebar-03/preview-dark.png"><img src="blocks/sidebar/sidebar-03/preview.png" alt="Nested Sidebar preview"></picture></a> |
| <sub>Sidebar · Button · Badge · <b>needs Basecoat JS</b></sub><br>[Code](blocks/sidebar/sidebar-03/block.html) · [Notes](blocks/sidebar/sidebar-03/README.md) |

### Dashboard

1 block · [category notes](blocks/dashboard/README.md) · [back to top](#basecoat-blocks)

| SaaS Dashboard · `dashboard-01` |
| --- |
| <a href="blocks/dashboard/dashboard-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/dashboard/dashboard-01/preview-dark.png"><img src="blocks/dashboard/dashboard-01/preview.png" alt="SaaS Dashboard preview"></picture></a> |
| <sub>Card · Badge · Progress · Table</sub><br>[Code](blocks/dashboard/dashboard-01/block.html) · [Notes](blocks/dashboard/dashboard-01/README.md) |

### Application

18 blocks · [category notes](blocks/application/README.md) · [back to top](#basecoat-blocks)

| Account Settings · `settings-01` | Users Table · `users-01` |
| --- | --- |
| <a href="blocks/application/settings-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/settings-01/preview-dark.png"><img src="blocks/application/settings-01/preview.png" alt="Account Settings preview"></picture></a> | <a href="blocks/application/users-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/users-01/preview-dark.png"><img src="blocks/application/users-01/preview.png" alt="Users Table preview"></picture></a> |
| <sub>Card · Field · Input · Native Select · Switch · Button · Badge</sub><br>[Code](blocks/application/settings-01/block.html) · [Notes](blocks/application/settings-01/README.md) | <sub>Card · Table · Avatar · Badge</sub><br>[Code](blocks/application/users-01/block.html) · [Notes](blocks/application/users-01/README.md) |

| API Keys · `api-keys-01` | Team Members · `team-members-01` |
| --- | --- |
| <a href="blocks/application/api-keys-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/api-keys-01/preview-dark.png"><img src="blocks/application/api-keys-01/preview.png" alt="API Keys preview"></picture></a> | <a href="blocks/application/team-members-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/team-members-01/preview-dark.png"><img src="blocks/application/team-members-01/preview.png" alt="Team Members preview"></picture></a> |
| <sub>Card · Field · Input · Native Select · Button · Badge</sub><br>[Code](blocks/application/api-keys-01/block.html) · [Notes](blocks/application/api-keys-01/README.md) | <sub>Card · Field · Input · Native Select · Button · Badge · Avatar</sub><br>[Code](blocks/application/team-members-01/block.html) · [Notes](blocks/application/team-members-01/README.md) |

| Billing Overview · `billing-01` | Activity Log · `audit-log-01` |
| --- | --- |
| <a href="blocks/application/billing-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/billing-01/preview-dark.png"><img src="blocks/application/billing-01/preview.png" alt="Billing Overview preview"></picture></a> | <a href="blocks/application/audit-log-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/audit-log-01/preview-dark.png"><img src="blocks/application/audit-log-01/preview.png" alt="Activity Log preview"></picture></a> |
| <sub>Card · Badge · Button · Table</sub><br>[Code](blocks/application/billing-01/block.html) · [Notes](blocks/application/billing-01/README.md) | <sub>Card · Table · Badge</sub><br>[Code](blocks/application/audit-log-01/block.html) · [Notes](blocks/application/audit-log-01/README.md) |

| Notification Preferences · `notifications-01` | Project Empty State · `empty-state-01` |
| --- | --- |
| <a href="blocks/application/notifications-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/notifications-01/preview-dark.png"><img src="blocks/application/notifications-01/preview.png" alt="Notification Preferences preview"></picture></a> | <a href="blocks/application/empty-state-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/empty-state-01/preview-dark.png"><img src="blocks/application/empty-state-01/preview.png" alt="Project Empty State preview"></picture></a> |
| <sub>Card · Fieldset · Field · Checkbox · Button</sub><br>[Code](blocks/application/notifications-01/block.html) · [Notes](blocks/application/notifications-01/README.md) | <sub>Card · Button</sub><br>[Code](blocks/application/empty-state-01/block.html) · [Notes](blocks/application/empty-state-01/README.md) |

| Workspace Setup · `onboarding-01` | File Upload · `file-upload-01` |
| --- | --- |
| <a href="blocks/application/onboarding-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/onboarding-01/preview-dark.png"><img src="blocks/application/onboarding-01/preview.png" alt="Workspace Setup preview"></picture></a> | <a href="blocks/application/file-upload-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/file-upload-01/preview-dark.png"><img src="blocks/application/file-upload-01/preview.png" alt="File Upload preview"></picture></a> |
| <sub>Card · Field · Input · Button</sub><br>[Code](blocks/application/onboarding-01/block.html) · [Notes](blocks/application/onboarding-01/README.md) | <sub>Card · Field · Input · Button</sub><br>[Code](blocks/application/file-upload-01/block.html) · [Notes](blocks/application/file-upload-01/README.md) |

| Command Menu · `command-menu-01` | Access Review Table · `users-table-02` |
| --- | --- |
| <a href="blocks/application/command-menu-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/command-menu-01/preview-dark.png"><img src="blocks/application/command-menu-01/preview.png" alt="Command Menu preview"></picture></a> | <a href="blocks/application/users-table-02/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/users-table-02/preview-dark.png"><img src="blocks/application/users-table-02/preview.png" alt="Access Review Table preview"></picture></a> |
| <sub>Command · Button · <b>needs Basecoat JS</b></sub><br>[Code](blocks/application/command-menu-01/block.html) · [Notes](blocks/application/command-menu-01/README.md) | <sub>Card · Table · Input · Select · Badge</sub><br>[Code](blocks/application/users-table-02/block.html) · [Notes](blocks/application/users-table-02/README.md) |

| Assistant Chat · `chat-01` | Deployment Run · `agent-run-01` |
| --- | --- |
| <a href="blocks/application/chat-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/chat-01/preview-dark.png"><img src="blocks/application/chat-01/preview.png" alt="Assistant Chat preview"></picture></a> | <a href="blocks/application/agent-run-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/agent-run-01/preview-dark.png"><img src="blocks/application/agent-run-01/preview.png" alt="Deployment Run preview"></picture></a> |
| <sub>Message · Bubble · Attachment · Marker · Shimmer · Avatar · Input Group · Badge · Button</sub><br>[Code](blocks/application/chat-01/block.html) · [Notes](blocks/application/chat-01/README.md) | <sub>Trace · Code Block · Card · Alert · Badge · Button · <b>needs Basecoat JS</b></sub><br>[Code](blocks/application/agent-run-01/block.html) · [Notes](blocks/application/agent-run-01/README.md) |

| Orders Data Table · `data-table-01` | Tabbed Workspace Settings · `settings-02` |
| --- | --- |
| <a href="blocks/application/data-table-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/data-table-01/preview-dark.png"><img src="blocks/application/data-table-01/preview.png" alt="Orders Data Table preview"></picture></a> | <a href="blocks/application/settings-02/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/settings-02/preview-dark.png"><img src="blocks/application/settings-02/preview.png" alt="Tabbed Workspace Settings preview"></picture></a> |
| <sub>Table · Input Group · Toggle Group · Button Group · Checkbox · Badge · Button</sub><br>[Code](blocks/application/data-table-01/block.html) · [Notes](blocks/application/data-table-01/README.md) | <sub>Tabs · Card · Field · Input Group · Toggle Group · Native Select · Switch · Button · <b>needs Basecoat JS</b></sub><br>[Code](blocks/application/settings-02/block.html) · [Notes](blocks/application/settings-02/README.md) |

| Kanban Board · `kanban-01` | Not Found Page · `error-404-01` |
| --- | --- |
| <a href="blocks/application/kanban-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/kanban-01/preview-dark.png"><img src="blocks/application/kanban-01/preview.png" alt="Kanban Board preview"></picture></a> | <a href="blocks/application/error-404-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/application/error-404-01/preview-dark.png"><img src="blocks/application/error-404-01/preview.png" alt="Not Found Page preview"></picture></a> |
| <sub>Badge · Avatar · Avatar Group · Progress · Button</sub><br>[Code](blocks/application/kanban-01/block.html) · [Notes](blocks/application/kanban-01/README.md) | <sub>Empty · Input Group · Kbd · Button</sub><br>[Code](blocks/application/error-404-01/block.html) · [Notes](blocks/application/error-404-01/README.md) |

### Marketing

6 blocks · [category notes](blocks/marketing/README.md) · [back to top](#basecoat-blocks)

| SaaS Hero · `hero-01` | Pricing Section · `pricing-01` |
| --- | --- |
| <a href="blocks/marketing/hero-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/marketing/hero-01/preview-dark.png"><img src="blocks/marketing/hero-01/preview.png" alt="SaaS Hero preview"></picture></a> | <a href="blocks/marketing/pricing-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/marketing/pricing-01/preview-dark.png"><img src="blocks/marketing/pricing-01/preview.png" alt="Pricing Section preview"></picture></a> |
| <sub>Button · Badge</sub><br>[Code](blocks/marketing/hero-01/block.html) · [Notes](blocks/marketing/hero-01/README.md) | <sub>Card · Button · Badge · Table</sub><br>[Code](blocks/marketing/pricing-01/block.html) · [Notes](blocks/marketing/pricing-01/README.md) |

| Feature Grid · `features-01` | FAQ Section · `faq-01` |
| --- | --- |
| <a href="blocks/marketing/features-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/marketing/features-01/preview-dark.png"><img src="blocks/marketing/features-01/preview.png" alt="Feature Grid preview"></picture></a> | <a href="blocks/marketing/faq-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/marketing/faq-01/preview-dark.png"><img src="blocks/marketing/faq-01/preview.png" alt="FAQ Section preview"></picture></a> |
| <sub>Badge</sub><br>[Code](blocks/marketing/features-01/block.html) · [Notes](blocks/marketing/features-01/README.md) | <sub>Accordion · Avatar Group · Badge · Button · <b>needs Basecoat JS</b></sub><br>[Code](blocks/marketing/faq-01/block.html) · [Notes](blocks/marketing/faq-01/README.md) |

| Testimonials Carousel · `testimonials-01` | Footer with CTA · `footer-01` |
| --- | --- |
| <a href="blocks/marketing/testimonials-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/marketing/testimonials-01/preview-dark.png"><img src="blocks/marketing/testimonials-01/preview.png" alt="Testimonials Carousel preview"></picture></a> | <a href="blocks/marketing/footer-01/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="blocks/marketing/footer-01/preview-dark.png"><img src="blocks/marketing/footer-01/preview.png" alt="Footer with CTA preview"></picture></a> |
| <sub>Carousel · Card · Avatar · Badge · Button · <b>needs Basecoat JS</b></sub><br>[Code](blocks/marketing/testimonials-01/block.html) · [Notes](blocks/marketing/testimonials-01/README.md) | <sub>Input · Button</sub><br>[Code](blocks/marketing/footer-01/block.html) · [Notes](blocks/marketing/footer-01/README.md) |

<!-- catalog:end -->

## Find by component

<details>
<summary>Show which blocks use each Basecoat component</summary>

<!-- components:start -->
Looking for a working example of one Basecoat component? Every block that uses it:

| Component | Blocks |
| --- | --- |
| Accordion | [`faq-01`](blocks/marketing/faq-01/block.html) |
| Alert | [`forgot-password-01`](blocks/authentication/forgot-password-01/block.html) [`agent-run-01`](blocks/application/agent-run-01/block.html) |
| Attachment | [`chat-01`](blocks/application/chat-01/block.html) |
| Avatar | [`users-01`](blocks/application/users-01/block.html) [`team-members-01`](blocks/application/team-members-01/block.html) [`chat-01`](blocks/application/chat-01/block.html) [`kanban-01`](blocks/application/kanban-01/block.html) [`testimonials-01`](blocks/marketing/testimonials-01/block.html) |
| Avatar Group | [`kanban-01`](blocks/application/kanban-01/block.html) [`faq-01`](blocks/marketing/faq-01/block.html) |
| Badge | [`sidebar-01`](blocks/sidebar/sidebar-01/block.html) [`sidebar-02`](blocks/sidebar/sidebar-02/block.html) [`sidebar-03`](blocks/sidebar/sidebar-03/block.html) [`dashboard-01`](blocks/dashboard/dashboard-01/block.html) [`settings-01`](blocks/application/settings-01/block.html) [`users-01`](blocks/application/users-01/block.html) [`api-keys-01`](blocks/application/api-keys-01/block.html) [`team-members-01`](blocks/application/team-members-01/block.html) [`billing-01`](blocks/application/billing-01/block.html) [`audit-log-01`](blocks/application/audit-log-01/block.html) [`users-table-02`](blocks/application/users-table-02/block.html) [`chat-01`](blocks/application/chat-01/block.html) [`agent-run-01`](blocks/application/agent-run-01/block.html) [`data-table-01`](blocks/application/data-table-01/block.html) [`kanban-01`](blocks/application/kanban-01/block.html) [`hero-01`](blocks/marketing/hero-01/block.html) [`pricing-01`](blocks/marketing/pricing-01/block.html) [`features-01`](blocks/marketing/features-01/block.html) [`faq-01`](blocks/marketing/faq-01/block.html) [`testimonials-01`](blocks/marketing/testimonials-01/block.html) |
| Bubble | [`chat-01`](blocks/application/chat-01/block.html) |
| Button | [`login-01`](blocks/authentication/login-01/block.html) [`login-02`](blocks/authentication/login-02/block.html) [`login-03`](blocks/authentication/login-03/block.html) [`signup-01`](blocks/authentication/signup-01/block.html) [`otp-01`](blocks/authentication/otp-01/block.html) [`forgot-password-01`](blocks/authentication/forgot-password-01/block.html) [`sidebar-01`](blocks/sidebar/sidebar-01/block.html) [`sidebar-02`](blocks/sidebar/sidebar-02/block.html) [`sidebar-03`](blocks/sidebar/sidebar-03/block.html) [`settings-01`](blocks/application/settings-01/block.html) [`api-keys-01`](blocks/application/api-keys-01/block.html) [`team-members-01`](blocks/application/team-members-01/block.html) [`billing-01`](blocks/application/billing-01/block.html) [`notifications-01`](blocks/application/notifications-01/block.html) [`empty-state-01`](blocks/application/empty-state-01/block.html) [`onboarding-01`](blocks/application/onboarding-01/block.html) [`file-upload-01`](blocks/application/file-upload-01/block.html) [`command-menu-01`](blocks/application/command-menu-01/block.html) [`chat-01`](blocks/application/chat-01/block.html) [`agent-run-01`](blocks/application/agent-run-01/block.html) [`data-table-01`](blocks/application/data-table-01/block.html) [`settings-02`](blocks/application/settings-02/block.html) [`kanban-01`](blocks/application/kanban-01/block.html) [`error-404-01`](blocks/application/error-404-01/block.html) [`hero-01`](blocks/marketing/hero-01/block.html) [`pricing-01`](blocks/marketing/pricing-01/block.html) [`faq-01`](blocks/marketing/faq-01/block.html) [`testimonials-01`](blocks/marketing/testimonials-01/block.html) [`footer-01`](blocks/marketing/footer-01/block.html) |
| Button Group | [`data-table-01`](blocks/application/data-table-01/block.html) |
| Card | [`login-03`](blocks/authentication/login-03/block.html) [`signup-01`](blocks/authentication/signup-01/block.html) [`otp-01`](blocks/authentication/otp-01/block.html) [`sidebar-01`](blocks/sidebar/sidebar-01/block.html) [`sidebar-02`](blocks/sidebar/sidebar-02/block.html) [`dashboard-01`](blocks/dashboard/dashboard-01/block.html) [`settings-01`](blocks/application/settings-01/block.html) [`users-01`](blocks/application/users-01/block.html) [`api-keys-01`](blocks/application/api-keys-01/block.html) [`team-members-01`](blocks/application/team-members-01/block.html) [`billing-01`](blocks/application/billing-01/block.html) [`audit-log-01`](blocks/application/audit-log-01/block.html) [`notifications-01`](blocks/application/notifications-01/block.html) [`empty-state-01`](blocks/application/empty-state-01/block.html) [`onboarding-01`](blocks/application/onboarding-01/block.html) [`file-upload-01`](blocks/application/file-upload-01/block.html) [`users-table-02`](blocks/application/users-table-02/block.html) [`agent-run-01`](blocks/application/agent-run-01/block.html) [`settings-02`](blocks/application/settings-02/block.html) [`pricing-01`](blocks/marketing/pricing-01/block.html) [`testimonials-01`](blocks/marketing/testimonials-01/block.html) |
| Carousel | [`testimonials-01`](blocks/marketing/testimonials-01/block.html) |
| Checkbox | [`login-01`](blocks/authentication/login-01/block.html) [`login-02`](blocks/authentication/login-02/block.html) [`login-03`](blocks/authentication/login-03/block.html) [`signup-01`](blocks/authentication/signup-01/block.html) [`notifications-01`](blocks/application/notifications-01/block.html) [`data-table-01`](blocks/application/data-table-01/block.html) |
| Code Block | [`agent-run-01`](blocks/application/agent-run-01/block.html) |
| Command | [`command-menu-01`](blocks/application/command-menu-01/block.html) |
| Empty | [`error-404-01`](blocks/application/error-404-01/block.html) |
| Field | [`login-01`](blocks/authentication/login-01/block.html) [`login-02`](blocks/authentication/login-02/block.html) [`login-03`](blocks/authentication/login-03/block.html) [`signup-01`](blocks/authentication/signup-01/block.html) [`otp-01`](blocks/authentication/otp-01/block.html) [`forgot-password-01`](blocks/authentication/forgot-password-01/block.html) [`settings-01`](blocks/application/settings-01/block.html) [`api-keys-01`](blocks/application/api-keys-01/block.html) [`team-members-01`](blocks/application/team-members-01/block.html) [`notifications-01`](blocks/application/notifications-01/block.html) [`onboarding-01`](blocks/application/onboarding-01/block.html) [`file-upload-01`](blocks/application/file-upload-01/block.html) [`settings-02`](blocks/application/settings-02/block.html) |
| Fieldset | [`notifications-01`](blocks/application/notifications-01/block.html) |
| Input | [`login-01`](blocks/authentication/login-01/block.html) [`login-02`](blocks/authentication/login-02/block.html) [`login-03`](blocks/authentication/login-03/block.html) [`signup-01`](blocks/authentication/signup-01/block.html) [`forgot-password-01`](blocks/authentication/forgot-password-01/block.html) [`settings-01`](blocks/application/settings-01/block.html) [`api-keys-01`](blocks/application/api-keys-01/block.html) [`team-members-01`](blocks/application/team-members-01/block.html) [`onboarding-01`](blocks/application/onboarding-01/block.html) [`file-upload-01`](blocks/application/file-upload-01/block.html) [`users-table-02`](blocks/application/users-table-02/block.html) [`footer-01`](blocks/marketing/footer-01/block.html) |
| Input Group | [`chat-01`](blocks/application/chat-01/block.html) [`data-table-01`](blocks/application/data-table-01/block.html) [`settings-02`](blocks/application/settings-02/block.html) [`error-404-01`](blocks/application/error-404-01/block.html) |
| Input OTP | [`otp-01`](blocks/authentication/otp-01/block.html) |
| Kbd | [`error-404-01`](blocks/application/error-404-01/block.html) |
| Marker | [`chat-01`](blocks/application/chat-01/block.html) |
| Message | [`chat-01`](blocks/application/chat-01/block.html) |
| Native Select | [`settings-01`](blocks/application/settings-01/block.html) [`api-keys-01`](blocks/application/api-keys-01/block.html) [`team-members-01`](blocks/application/team-members-01/block.html) [`settings-02`](blocks/application/settings-02/block.html) |
| Progress | [`dashboard-01`](blocks/dashboard/dashboard-01/block.html) [`kanban-01`](blocks/application/kanban-01/block.html) |
| Select | [`users-table-02`](blocks/application/users-table-02/block.html) |
| Shimmer | [`chat-01`](blocks/application/chat-01/block.html) |
| Sidebar | [`sidebar-01`](blocks/sidebar/sidebar-01/block.html) [`sidebar-02`](blocks/sidebar/sidebar-02/block.html) [`sidebar-03`](blocks/sidebar/sidebar-03/block.html) |
| Switch | [`settings-01`](blocks/application/settings-01/block.html) [`settings-02`](blocks/application/settings-02/block.html) |
| Table | [`dashboard-01`](blocks/dashboard/dashboard-01/block.html) [`users-01`](blocks/application/users-01/block.html) [`billing-01`](blocks/application/billing-01/block.html) [`audit-log-01`](blocks/application/audit-log-01/block.html) [`users-table-02`](blocks/application/users-table-02/block.html) [`data-table-01`](blocks/application/data-table-01/block.html) [`pricing-01`](blocks/marketing/pricing-01/block.html) |
| Tabs | [`settings-02`](blocks/application/settings-02/block.html) |
| Toggle Group | [`data-table-01`](blocks/application/data-table-01/block.html) [`settings-02`](blocks/application/settings-02/block.html) |
| Trace | [`agent-run-01`](blocks/application/agent-run-01/block.html) |

<!-- components:end -->

</details>

## Good to know

- **Static examples, not services.** Some blocks have local interactions (table search, command filtering, tabs), but none implement sign-in, billing, persistence, file storage or server requests. Each block's **Notes** say what to wire up.
- **`block.html` is the only file per block.** It is a fragment: no document shell, no asset imports, no framework code. A few blocks carry a small inline `<script>` for their local interaction.
- **Colors come from Basecoat's theme.** Blocks use semantic utilities such as `bg-muted`, `text-muted-foreground` and `border`, so they follow your Basecoat theme and dark mode (`class="dark"` on `<html>`).
- **Another Basecoat version or style?** The blocks are built and screenshotted against Basecoat 1.2.1 with its default style. Check the component docs and rendering before pasting into another setup.
- **See a block live without hosting:** clone the repo, run `npm install` and `npm run preview -- <block-name>`, then open the printed `.cache/preview/<block-name>.html` in your browser.

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for block anatomy, accessible HTML, naming, and the build and screenshot tooling (`npm run build`, `npm run screenshots`). MIT licensed; see [LICENSE](LICENSE).

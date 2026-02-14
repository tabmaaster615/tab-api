🚀 NOW: WHAT ARE THE NEXT STEPS?

We move in this order:

🟢 STEP 1 — Fix Entities Properly

- Before anything else:

- Fix Role entity naming

- Add JoinTable

- Add unique constraints

- Increase phone length

- Remove institution from User

- Generate migration.

- Run migration.

- This locks schema cleanly.

🟢 STEP 2 — Seed Initial Roles & Permissions

- Professional systems:

- Don’t manually insert roles.

- Use a seed script.

Seed:

- Permissions:

- CREATE_TOURNAMENT

- EDIT_TOURNAMENT

- MANAGE_ROUNDS

- ASSIGN_ADJUDICATORS

- SUBMIT_BALLOT

- VIEW_PUBLIC_STANDINGS

Roles:

- SUPER_ADMIN

- TOURNAMENT_ADMIN

- TAB_DIRECTOR

- ADJUDICATOR

- SPEAKER

- Attach permissions to roles.

🟢 STEP 3 — Build UsersService (Domain Logic)

- Not controller yet.

Service should:

- Create user (hash password)

- Assign role

- Get user with roles & permissions

- Check if user has permission (core method)

Important method:

```
async userHasPermission(
userId: string,
permission: string,
tournamentId?: string
)
```

This becomes foundation of your entire security layer.

🟢 STEP 4 — Build AuthModule

Only after:

- Users exist

- Roles exist

- Password hashing exists

🟢 STEP 5 — Build Permission Guard

Custom guard that:

- Extracts user from JWT

- Checks permission via UsersService

- Blocks access if not allowed

This becomes your RBAC enforcement.

🧠 What You Should Study Next

What is a join table?

What is cascade delete?

Difference between eager vs lazy loading

What is database normalization?

🎯 Very Important Question For You

Do you want:

A) Fix entities first and I give you corrected versions
B) Move directly into seeding system
C) Design Tournament entity now (so we can properly link UserTournamentRole)

Tell me one letter.

We move step by step — no rushing — production mindset only 💪

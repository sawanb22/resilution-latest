## Push Log

This file is intended to record a short, human-readable summary of changes made and pushed.

Note: this file will be added to `.gitignore` so subsequent local edits won't appear as untracked files. The initial version will be committed and pushed so there is a baseline record in the repository.

---

Template (append a new entry for each push):

- Date: 2025-12-13
- Branch: master
- Commit: <short-sha>
- Author: <name>
- Summary: Short description of notable changes in this push (3-6 lines max).
- Files changed: list of the main files changed

Example:

- Date: 2025-12-13
- Branch: master
- Commit: 67f97b8
- Author: Bhard
- Summary: Restored and improved `api/subscribe.js`, added Newsletter popup, and prepared Twitter tracking helper.
- Files changed: api/subscribe.js, src/Component/Common/NewsletterPopup.jsx, src/utils/twitterTracking.js

---

Guidance:
- Keep entries concise. Use the template above. It's fine to copy the commit message and add a brief context line.
- If you want to stop tracking this file (so it's not in the repo at all), remove it from Git and keep it locally; ask me and I can set that up.

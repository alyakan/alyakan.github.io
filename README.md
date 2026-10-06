# alyakan.github.io

Personal site. Plain HTML, CSS and JS with no build step.

The hero demo runs the lookup from PostHog's device marketing names transformation (PostHog/posthog#112937). Its table lives in `assets/device-names.js` and is generated from the template:

```sh
awk 'BEGIN{print "window.DEVICE_NAMES = {"} /let names := \{/{f=1;next} f&&/^\}/{f=0} f&&/^    '\''/{print} END{print "};"}' \
  ../posthog/posthog-main/nodejs/src/cdp/templates/_transformations/device-marketing-names/device-marketing-names.template.ts \
  > assets/device-names.js
```

## Run locally

```sh
python3 -m http.server 8000
```

## Publish

1. Create a public repo named `alyakan.github.io` on GitHub.
2. Push this folder to its `main` branch.
3. In the repo's Settings > Pages, set the source to "Deploy from a branch", `main`, `/ (root)`.
4. The site appears at https://alyakan.github.io within a minute or two.

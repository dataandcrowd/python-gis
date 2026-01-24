# Kart: clone Stats NZ data

Kart provides a git-like interface for cloning and updating vector/tabular datasets.
See <https://kartproject.org> for installation and full documentation.

## 1) Install Kart

Follow the official instructions for your platform:

- <https://kartproject.org>

Confirm it is installed:

```bash
kart --version
```

## 2) Clone the dataset

Choose one of the clone URLs below.

**SSH**

```bash
kart clone kart@data.koordinates.com:statsnz/2023-census-main-means-of-travel-to-work-by-statistical-area-2
```

If you see `Permission denied (publickey)`, your SSH key is not registered. Either:

- add your public key to your Koordinates account, or
- use HTTPS instead.

**HTTPS**

```bash
kart clone https://data.koordinates.com/statsnz/2023-census-main-means-of-travel-to-work-by-statistical-area-2
```

## 3) Keep the dataset up to date

```bash
cd 2023-census-main-means-of-travel-to-work-by-statistical-area-2
kart pull
```

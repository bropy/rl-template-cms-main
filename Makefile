# ------------------------------------------------------------
# Start
# ------------------------------------------------------------

# Quick start
.PHONY: quick-start
quick-start:
	@make client-dev

# First start
.PHONY: first-start
first-start:
	@make client-copy-env && make client-install && make client-dev	


# ------------------------------------------------------------
# Client prepare
# ------------------------------------------------------------

# Client copy env
.PHONY: client-copy-env
client-copy-env:
	cp .env.example .env

# Client install
.PHONY: client-install
client-install:
	yarn install


# ------------------------------------------------------------
# Run client dev
# ------------------------------------------------------------

# Run client dev
.PHONY: client-dev
client-dev:
	yarn dev


# ------------------------------------------------------------
# Client commands
# ------------------------------------------------------------

# Run client code check
.PHONY: client-code-check
client-code-check:
	yarn format
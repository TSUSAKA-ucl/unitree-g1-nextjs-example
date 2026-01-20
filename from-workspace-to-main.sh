#!/bin/bash
git diff --name-only HEAD workspace --diff-filter=AM |\
    xargs git checkout workspace -- && git status

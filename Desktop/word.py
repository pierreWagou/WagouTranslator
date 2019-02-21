#!/usr/bin/python3.7

import random

class Word():

    def __init__(self):
        self.id = 0
        self.en = ""
        self.wg = ""

    def buildWagou(self):
        voyelles = "aeiouy"
        consonnes = "zrtpqsdfghjklmwxcvbn"
        pre = ""
        suf = ""
        optPre = random.randrange(2)
        optSuf = random.randrange(2)
        longueurPre = random.randrange(0,3)
        longueurSuf = random.randrange(0,3)
        if optPre:
            pre = pre + random.choice(voyelles)
        for i in range(longueurPre):
            pre = pre + random.choice(consonnes)
            pre = pre + random.choice(voyelles)
        for i in range(longueurSuf):
            suf = suf + random.choice(consonnes)
            suf = suf + random.choice(voyelles)
        if optSuf:
            suf = suf + random.choice(consonnes)
        self.wg = pre + "wagou" + suf

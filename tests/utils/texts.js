module.exports = [
    {
        raw: `\
In the beginning God created the heavens and the earth. \
Now the earth was formless and empty, darkness was over the surface of the \
deep, and the Spirit of God was hovering over the waters.

And God said, "Let there be light," and there was light. God saw that \
the light was good, and he separated the light from the darkness. \
God called the light "day," and the darkness he called "night." \
And there was evening, and there was morning - the first day.`,
        expected: `\
In the beginning God created the heavens
and the earth. Now the earth was
formless and empty, darkness was over
the surface of the deep, and the Spirit
of God was hovering over the waters.

And God said, "Let there be light," and
there was light. God saw that the light
was good, and he separated the light
from the darkness. God called the light
"day," and the darkness he called
"night." And there was evening, and
there was morning - the first day.`,
        raise: null,
        limiter: 40,
        justified: false
    },
    {
        raw: `\
In the beginning God created the heavens and the earth. \
Now the earth was formless and empty, darkness was over the surface of the \
deep, and the Spirit of God was hovering over the waters.`,
        expected: `\
In the beginning God created the heavens
and the earth. Now the earth was
formless and empty, darkness was over
the surface of the deep, and the Spirit
of God was hovering over the waters.`,
        raise: null,
        limiter: 40,
        justified: false
    },
    {
        raw: `\
b
r
e
a
k

s
i
n
g
l
e`,
        expected: `\
b
r
e
a
k

s
i
n
g
l
e`,
        raise: null,
        limiter: 1,
        justified: false
    },
    {
        raw: `a b c d e`,
        expected: `\
a
b
c
d
e`,
        raise: null,
        limiter: 1,
        justified: false
    },
    {
        raw: `\
In the beginning God created the heavens and the earth. \
Now the earth was formless and empty, darkness was over the surface of the \
deep, and the Spirit of God was hovering over the waters.

And God said, "Let there be light," and there was light. God saw that \
the light was good, and he separated the light from the darkness. \
God called the light "day," and the darkness he called "night." \
And there was evening, and there was morning - the first day.\
`,
        expected: `\
In the beginning God created the heavens
and   the  earth.   Now  the  earth  was
formless  and empty,  darkness was  over
the  surface of the deep, and the Spirit
of  God was  hovering over  the  waters.

And  God said, "Let there be light," and
there  was light. God saw that the light
was  good, and  he separated  the  light
from  the darkness. God called the light
"day,"   and  the   darkness  he  called
"night."  And  there  was  evening,  and
there  was  morning  -  the  first  day.\
`,
        raise: null,
        limiter: 40,
        justified: true
    },
    {
        raw: `\
diami Aliquam erat volutpat.
diami Aliquam erat volutpat.
diami Aliquam erat volutpat.
diami Aliquam erat volutpat.`,
        expected: `\
diami            Aliquam           erat            volutpat.
diami            Aliquam           erat            volutpat.
diami            Aliquam           erat            volutpat.
diami            Aliquam           erat            volutpat.`,
        raise: null,
        limiter: 60,
        justified: true
    },
    {
        raw: `\
diami Aliquam erat volutpat.
diami Aliquam erat volutpat.
diami Aliquam erat volutpat.
diami Aliquam erat volutpat.`,
        expected: `The word "Aliquam" can't respect your maximum limit of characters per line!`,
        raise: `WordLengthGreaterThanLimit`,
        limiter: 5,
        justified: true
    },
    {
        raw: `\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Mauris volutpat feugiat accumsan. Proin pharetra ipsum qu\
is ultricies facilisis. Proin felis risus, imperdiet ut i\
aculis ac, sagittis ut augue. Mauris eros odio, viverra e\
t aliquam ac, consequat et lectus. Aenean imperdiet fring\
illa leo sed elementum. Etiam efficitur nibh at metus auc\
tor faucibus. Morbi nec blandit nisi. Cras ut pellentesqu\
e turpis. Nunc euismod metus augue, at tempus ligula vehi\
cula sed.

Nunc interdum id metus eu pharetra. Mauris porttitor quis\
 leo ut semper. Aliquam id nunc imperdiet diam pharetra s\
agittis. Aliquam mattis, lorem id sodales consequat, veli\
t libero feugiat eros, ac molestie neque tortor eu eros. \
Aliquam felis ipsum, porta id vulputate et, tincidunt non\
 justo. Cras posuere sem a mi laoreet, ac ullamcorper dia\
m ultrices. Aliquam accumsan et ligula in fringilla.`,
        expected: `\
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Mauris  volutpat feugiat  accumsan. Proin pharetra ipsum
quis  ultricies facilisis.  Proin felis risus, imperdiet
ut  iaculis ac,  sagittis ut  augue. Mauris  eros  odio,
viverra  et aliquam  ac,  consequat  et  lectus.  Aenean
imperdiet  fringilla leo  sed elementum. Etiam efficitur
nibh  at metus  auctor faucibus. Morbi nec blandit nisi.
Cras  ut pellentesque  turpis. Nunc euismod metus augue,
at        tempus       ligula        vehicula       sed.

Nunc  interdum id  metus eu  pharetra. Mauris  porttitor
quis  leo ut  semper. Aliquam  id  nunc  imperdiet  diam
pharetra  sagittis. Aliquam  mattis,  lorem  id  sodales
consequat,  velit libero feugiat eros, ac molestie neque
tortor  eu eros. Aliquam felis ipsum, porta id vulputate
et,  tincidunt non justo. Cras posuere sem a mi laoreet,
ac ullamcorper diam ultrices. Aliquam accumsan et ligula
in                                            fringilla.`,
        raise: null,
        limiter: 56,
        justified: true
    },
    {
        raw: `\
Nunc interdum id metus eu pharetra. Mauris porttitor quis\
 leo ut semper. Aliquam id nunc imperdiet diam pharetra s\
agittis. Aliquam mattis, lorem id sodales consequat, veli\
t libero feugiat eros, ac molestie neque tortor eu eros. \
Aliquam felis ipsum, porta id vulputate et, tincidunt non\
 justo. Cras posuere sem a mi laoreet, ac ullamcorper dia\
m ultrices. Aliquam accumsan et ligula in fringilla.`,
        expected: `\
Nunc   interdum  id   metus   eu
pharetra.  Mauris porttitor quis
leo  ut semper.  Aliquam id nunc
imperdiet      diam     pharetra
sagittis.  Aliquam mattis, lorem
id   sodales  consequat,   velit
libero feugiat eros, ac molestie
neque  tortor eu  eros.  Aliquam
felis  ipsum, porta id vulputate
et,  tincidunt non  justo.  Cras
posuere  sem a  mi  laoreet,  ac
ullamcorper    diam    ultrices.
Aliquam  accumsan et  ligula  in
fringilla.`,
        raise: null,
        limiter: 32,
        justified: true
    },
    {
        raw: `a b c d e`,
        expected: `\
a
b
c
d
e`,
        raise: null,
        limiter: 1,
        justified: true
    },
    {
        raw: `aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa`,
        expected: `\
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa`,
        raise: null,
        limiter: 10,
        justified: true
    },
    {
        raw: `\
b
r
e
a
k

j

s
i
n
g
l
e`,
        expected: `\
b
r
e
a
k

j

s
i
n
g
l
e`,
        raise: null,
        limiter: 1,
        justified: true
    },
    {
        raw: `\
b 
r 
e 
a 
k `,
        expected: `\
b

r

e

a

k
`,
        raise: null,
        limiter: 1,
        justified: true
    },
    {
        raw: `aaa aaa aaaa`,
        expected: `Maximum characters per line must be 1 or greater`,
        raise: `LowLimiter`,
        limiter: 0,
        justified: false,
    }
];

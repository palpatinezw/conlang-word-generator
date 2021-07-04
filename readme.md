# Conlang Word Generator
This is a Word Generator for use in Conlangs. Word generator is based on the principle of using a graph of sequences and groups, to enable flexible, well-defined word generation. 

## Key features
When fully developed, the App will support complex and flexible nesting for sequences and groupings for word generation. For instance, groups of *fricatives*, *stops*, *vowels*, *nasals* and *liquids* can be defined, and a *cluster* can be defined as a sequence of *fricatives* and *liquids*. A syllable sequence can be defined as a sequence consisting of either a *cluster* or a *fricative* or a *stop*, followed by a *vowel*, followed by a *nasal*. The important feature here is that these sequences and groupings are fully user defined and can be modified and nested infinitely (subject to limitations in computing power, naturally). 

## Technical specifications
This project is written in Javascript, using React Native with Expo. 

## Changelog
### 04/07/2021
Phoneme page functionality working
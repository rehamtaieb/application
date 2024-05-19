package tn.esprit.rh.achat;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import tn.esprit.rh.achat.entities.CategorieProduit;
import tn.esprit.rh.achat.entities.Produit;
import tn.esprit.rh.achat.repositories.CategorieProduitRepository;
import tn.esprit.rh.achat.repositories.ProduitRepository;
import tn.esprit.rh.achat.services.CategorieProduitServiceImpl;
import tn.esprit.rh.achat.services.ProduitServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class CategProduitTest {
    @Mock
    CategorieProduitRepository categproduitRepository;

    @InjectMocks
    CategorieProduitServiceImpl mockcategproduitService;

    @Test
    public void testAddProduitcateg() {
        CategorieProduit categorie = new CategorieProduit();

        categorie.setLibelleCategorie("boisson");
        categorie.setCodeCategorie("codeB");

        when(categproduitRepository.save(categorie)).thenReturn(categorie);
        assertNotNull(mockcategproduitService.addCategorieProduit(categorie));


    }

    @Test
    public void testUpdateCategProduit() {
        CategorieProduit categ = new CategorieProduit();

        categ.setLibelleCategorie("machroubet");

        when(categproduitRepository.save(categ)).thenReturn(categ);
        CategorieProduit updatedCategory = mockcategproduitService.updateCategorieProduit(categ);
        assertNotNull(updatedCategory);
        assertEquals("machroubet",updatedCategory.getLibelleCategorie());


    }

    @Test
    public void testReadCategProduct() {

        Long id = 1L;
        CategorieProduit expectedCategorieProduit = new CategorieProduit();
        expectedCategorieProduit.setIdCategorieProduit(id);


        Mockito.when(categproduitRepository.findById(id)).thenReturn(java.util.Optional.of(expectedCategorieProduit));


        CategorieProduit actualCategorieProduit = mockcategproduitService.retrieveCategorieProduit(id);


        Assertions.assertEquals(expectedCategorieProduit, actualCategorieProduit);


    }

    @Test
    public void testDeleteCategProduct() {

        mockcategproduitService.deleteCategorieProduit(1L);

    }





}
